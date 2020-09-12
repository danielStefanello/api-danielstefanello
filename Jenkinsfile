pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''docker build -t api-danielstefanello .

if [ "$(docker ps -aq -f name=api-danielstefanello)" ]; then
  docker rm -f api-danielstefanello
fi

docker run --name api-danielstefanello -d --expose 3333 --network web -e VIRTUAL_HOST=api.danielstefanello.com.br -e LETSENCRYPT_HOST=api.danielstefanello.com.br api-danielstefanello'''
      }
    }

    stage('Migrations') {
      steps {
        sh 'yarn sequelize db:migrate'
      }
    }

  }
  environment {
    APP_URL = 'https://api.danielstefanello.com.br/'
    NODE_ENV = 'production'
    APP_SECRET = '995575e8bf94fafedc420de6c103828c'
    DB_HOST = 'postgres'
    DB_USER = 'psqlhippodev'
    DB_PASS = 'hippodev231507'
    DB_NAME = 'apidds'
  }
}