pipeline {
    agent none

    environment {
        DOCKERHUB_USERNAME = "suryamani7"
        IMAGE_NAME = "pytho"
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {

        stage("staging pipeline") {
            when {
                branch 'staging'
            }
            agent {
                label 'staging-node'
            }
            steps {
                echo "staging branch detected! running on working stage"
                chechout scm
                echo "building staging image...."
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:staging ."
                sh "trivy image ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:staging > trivy-staging-report.txt"

                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'docker-hub-creds',
                            passwordVariable: 'DOCKER_PASS',
                            usernameVariable: 'DOCKER_USER'
                        )
                    ]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:staging"
                    }
                }

                script {
                    echo "Deploying to staging Environment..."
                    sh "docker rm -f pytho-staging || true"
                    sh "docker run -d -p 5000:80 --name pytho-staging ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:staging"
                }
            }
        }

        stage("production pipeline") {
            when {
                branch 'main'
            }
            agent {
                label 'prod-node'
            }
            steps {
                echo "Main branch detected! running on worker prod...."
                checkout scm

                echo "Running owasp scan..."
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit',
                                odcInstallation: 'DP-Check'

                echo "running sonnarqube analysis"
                withSonarQubeEnv('sonar-server') {
                    // code ko scan karke report server par bhejna
                    sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=pytho-prod -Dsonar.sources=."
                }

                echo "building production image"
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${BUILD_NUMBER} ."

                echo "Running strict security scan...."
                sh "trivy image ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest > trivy-image-report.txt"

                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'docker-hub-creds',
                            passwordVariable: 'DOCKER_PASS',
                            usernameVariable: 'DOCKER_USER'
                        )
                    ]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                        sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${BUILD_NUMBER}"
                    }
                }

                script {
                    echo "deploying to production"
                    sh "docker rm -f pytho-prod || true"
                    sh "docker run -d -p 80:80 --name pytho-prod ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            // OWASP ki report graph ke roop mein dikhana
            dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            // trivy report ko archive karna taaki download kar sakein
            archiveArtifacts artifacts: '*.txt', allowEmptyArchive: true
            sh "docker logout || true"
            cleanWs()
        }
    }
}
