pipeline{
    agent any;

    environment{
        // Apna docker Hub username yaha lihna hoga
        DOCKERHUB_USERNAME = "suryamani7"
        IMAGE_NAME = "patho"
        IMAGE_TAG = "${BUILD_NUMBER}" // har build ka alag tag hoga (e.g. 1, 2, 3)
    }

    stages{
        stage("checkout code"){
            steps{
                // kyuki hum pipeline from SCM use karege
                // jenkins automatically code checkout kar lega
                // yaha alag se git command likhne ki zaroorat nahi hoti
                ehco "Code chechout done automatically via SCM"
            }
        }
        stage("Build Docker Image"){
            steps{
                echo "Building Docker Image...."
                // Image ka name format : dockerhub_username/image:tag
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."

                // ek latest tag bhi banate hai taaki deploy karna aashan ho
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
            }
        }
        stage("Push to Docker Hub"){
            steps{
                script {
                    echo "Pushing to Docker Hub..."
                    // yahan hum wo Credential ID use kar rahe hai jo jekins mein save kiye hai
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]){
                        //login command
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                        // push command
                        sh 'docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}'
                        sh 'docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest'
                    }
                }
            }
        }
        stage{
            steps{
                script{
                    echo "Deploying Application...."
                    // purana container hatao
                    sh "docker rm -f pytho-container || true"

                    // naya container run karo (docker hub wala image use karke)
                    sh "docker run -d -p 80:80 --name pytho-container ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
    // build ke baad safai karna jaruri hai taaki disk full na ho
    post {
        always {
            sh "docker logout"
        }
    }
}