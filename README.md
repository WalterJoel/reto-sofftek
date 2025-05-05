Serverless Multiple API
Proyecto basado en NestJS, diseñado para ejecutarse de manera serverless utilizando AWS Lambda y API Gateway. Esta API integra múltiples fuentes externas para ofrecer datos enriquecidos y almacenarlos de forma eficiente.

🌐 APIs Integradas
SWAPI – API del universo de Star Wars.

Open Meteo – Provee información meteorológica actual.

AWS DynamoDB – Base de datos NoSQL utilizada para almacenar y fusionar datos obtenidos de las APIs externas.

Los datos obtenidos de SWAPI y Open Meteo se combinan de forma inteligente y se almacenan en DynamoDB, permitiendo consultar información enriquecida con base en el timestamp del último ingreso.

🚀 Instalación
bash
Copy
Edit
npm install
▶️ Ejecución
bash
Copy
Edit
# Local con Serverless Offline
sls offline

# Despliegue en AWS
sls deploy
⚠️ Asegúrate de tener configuradas tus credenciales AWS en el archivo ~/.aws/credentials.

✅ Pruebas
bash
Copy
Edit
npm run test
📄 Documentación Swagger
La documentación de la API se genera automáticamente con Swagger y está disponible en:

🔗 https://v7cmfko9ef.execute-api.us-east-1.amazonaws.com/api


