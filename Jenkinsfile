pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')        
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Server') {
            steps {
                dir('server') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build Images') {
            steps {
                dir('server') {
                    sh 'docker build -t adittyapatil1818/caketrack_jenkins:server .'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push adittyapatil1818/caketrack_jenkins:server'
                }
            }
        }

        stage('Run Containers') {
            steps {
                // Stop and remove the existing containers you want to replace (with error handling)
                sh 'docker stop container_name1 || true'
                sh 'docker rm container_name1 || true'

                // Start the new containers
                sh 'docker run -d -p 4000:4000 -e DB_URL=$DB_URL --name container_name1 adittyapatil1818/caketrack_jenkins:server'
            }
        }
    }
}
//restart