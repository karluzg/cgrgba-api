import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    info: {
      title: 'API da plataforma do Consulado Geral da Republica da Guiné-Bissau na Albufeira',
      version: '1.0.0',
    },
    basePath: '/api/v1',
  },
  apis: ['src/application/routes-management/shared-routes/*.ts'
,'src/application/routes-management/scheduling-manager/*.ts'
,'src/application/routes-management/user-manager/*.ts'
,'src/application/model/user-manager/*.ts'], // Substitua pelo caminho dos seus arquivos de rotas
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};