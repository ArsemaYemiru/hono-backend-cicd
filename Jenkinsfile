pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = "arsema/hono-backend-cicd"
        CONTAINER_NAME = "hono-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ArsemaYemiru/hono-backend-cicd.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Compile TypeScript') {
            steps {
                sh 'npx tsc'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME  true
                    docker rm $CONTAINER_NAME  true
                    docker run -d -p 3000:3000 --name $CONTAINER_NAME $DOCKER_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Backend CI/CD pipeline completed successfully'
        }
        failure {
            echo 'Backend pipeline failed'
        }
    }
}