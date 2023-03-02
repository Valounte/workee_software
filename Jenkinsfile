pipeline {
    agent {
        docker {
            image 'brasegon/ubuntu-amq:php8'
            args '-v $PWD:/app -w /app -u root'
        }
    }
    stages {
        stage('Git clone') {
            steps {
                git branch: 'master', credentialsId: 'test', url: 'git@github.com:Valounte/workee_backend.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'ls -ll'
            }
        }
    }
}
pipeline {
    agent {
        docker {
            image 'brasegon/ubuntu-amq:php8'
            args '-v $PWD:/app -w /app -u root'
        }
    }
    stages {
        stage('Git clone') {
            steps {
                git branch: 'master', credentialsId: 'test', url: 'git@github.com:Valounte/workee_backend.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'ls -ll'
            }
        }
    }
}
