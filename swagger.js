const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Car Meet API',
    description: 'API for cars and car meet events'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);