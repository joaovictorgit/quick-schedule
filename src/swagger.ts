import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Quick Schedule',
    description: 'Documentação da API'
  },
  host: 'localhost:3000',
  schemas: ['http'],
};

const outputFile = './src/docs/swagger.json';
const endpointsFiles = [
  './src/routes/index.ts',
];

swaggerAutogen()(outputFile, endpointsFiles, doc);