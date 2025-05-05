# Serverless Multiple API

Proyecto basado en **[NestJs](https://github.com/nestjs/nest)** y utilizando dos APIs externas: **[SWAPI](https://swapi.py4e.com/)** (Star Wars API) y **[Open Meteo](https://open-meteo.com/)**.

Esta API está diseñada para funcionar de manera serverless, utilizando **AWS Lambda** y **API Gateway** para manejar solicitudes de diferentes servicios.

## Instalación

Para instalar las dependencias necesarias, ejecuta el siguiente comando:

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

Documentación Swagger autogenerada en `/api`
