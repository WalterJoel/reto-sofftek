
# Serverless Multiple API

Este proyecto está construido con **NestJS** y desplegado en una arquitectura **Serverless** utilizando **AWS Lambda** y **API Gateway**. Su propósito es fusionar datos de distintas APIs externas, como la de Star Wars (SWAPI) y Open Meteo, para luego almacenarlos y servirlos desde **DynamoDB**.


## Instalación

```bash
$ npm install
```

## Ejecutar el App

```bash
# Local
$ sls offline

# Despliegue AWS (asegurar de tener configurado las credenciales en ./aws)
$ sls deploy
```

## Test

```bash
$ npm run test
```

## Documentación

Documentación Swagger autogenerada

🔗 https://v7cmfko9ef.execute-api.us-east-1.amazonaws.com/api




