require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const { initDb } = require('./db/connect');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});