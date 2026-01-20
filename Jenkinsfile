pipeline{
    agent any

    

    environment{
        // Apna docker Hub username yaha lihna hoga
        DOCKERHUB_USERNAME = "suryamani7"
        IMAGE_NAME = "patho"
        IMAGE_TAG = "${BUILD_NUMBER}" // har build ka alag tag hoga (e.g. 1, 2, 3)
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages{
        stage("checkout code"){
            // stage 1: Github se code lana
            steps{
                // kyuki hum pipeline from SCM use karege
                // jenkins automatically code checkout kar lega
                // yaha alag se git command likhne ki zaroorat nahi hoti
                echo "Code chechout done automatically via SCM"
            }
        }
        // stage 2: OWASP Dependency Check (security)
        stage("OWASP Security Scan"){
            steps{
                echo "Scanning for Vulnerabilities...."

                // 'DP-Check' wo name hai jo humne tools mein diya tha
                // pheli baar chalne mein 10-20 min lagega (Database update hone mein)
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
            }
        }
        // stage 3: SonarQube Analysis(Quality)
        stage("SonarQube Analysis"){
            steps{
                // 'sonar-server' system config wala naam hai
                withSonarQubeEnv('sonar-server'){
                    // code ko scan karke report server par bhejna
                    sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=my-webapp -Dsonar.sources=."
                }
            }
        }
        //stage 4. docker build
        stage("Build Docker Image"){
            steps{
                echo "Building Docker Image...."
                // Image ka name format : dockerhub_username/image:tag
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."

                // ek latest tag bhi banate hai taaki deploy karna aashan ho
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
            }
        }
        // stage 5. push to docker hub
        stage("Push to Docker Hub"){
            steps{
                script {
                    echo "Pushing to Docker Hub..."
                    // yahan hum wo Credential ID use kar rahe hai jo jekins mein save kiye hai
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]){
                        //login command
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"

                        // push command
                        sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                    }
                }
            }
        }
        // stage 6. deploy
        stage("Deploy Container"){
            steps{
                script{
                    echo "Deploying Application...."
                    // purana container hatao aur agar koi container run nahi hai pahle se to jo error aayega usko skip karo aage badho
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
            // OWASP ki report graph ke roop mein dikhana
            dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            sh "docker logout || true"
        }
    }
}