const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Car Meet API',
    description: 'API for cars and car meet events'
  },
  host: 'carmeetapi.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);