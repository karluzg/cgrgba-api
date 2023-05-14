import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { UserParams } from './application/model/user-manager/UserParams';
import { classToJsonSchema } from './infrestructure/template/SchemaTemplate';
import { UserResult } from './application/model/user-manager/UserResult';
import { UpdatePasswordParams } from './application/model/user-manager/UpdatePasswordParams';
import { UserLoginResult } from './application/model/user-manager/UserLoginResult';
import { UserLoginParams } from './application/model/user-manager/UserLoginParams';
import { SchedulingParams } from './application/model/scheduling-manager/scheduling/SchedulingParams';
import { SchedulingResult } from './application/model/scheduling-manager/scheduling/SchedulingResult';
import { User } from './domain/model/User';
import { TimeSlotParams } from './application/model/scheduling-manager/schedulingTime/params/TimeSlotParams';
import { TimeSlotListParams } from './application/model/scheduling-manager/schedulingTime/params/TimeSlotListParams';
import { TimeSlotResult } from './application/model/scheduling-manager/schedulingTime/TimeSlotResult';
import { TokenSession } from './domain/model/TokenSession';
import { RoleParams } from './application/model/user-manager/RoleParams';
import { PermissionParams } from './application/model/user-manager/PermissionParams ';
import { PermissionResult } from './application/model/user-manager/PermissionResult';
import { RoleResult } from './application/model/user-manager/RoleResult ';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API da plataforma do Consulado Geral da Republica da Guiné-Bissau na Albufeira',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
      },
    ],
    components: {
      schemas: {
        User: classToJsonSchema(User),
        UserParams: classToJsonSchema(UserParams),
        UserResult: classToJsonSchema(UserResult),
        UserLoginResult: classToJsonSchema(UserLoginResult),
        UserLoginParams: classToJsonSchema(UserLoginParams),
        SchedulingParams: classToJsonSchema(SchedulingParams),
        SchedulingResult: classToJsonSchema(SchedulingResult),
        TimeSlotListParams: classToJsonSchema(TimeSlotListParams),
        TimeSlotParams: classToJsonSchema(TimeSlotParams),
        TimeSlotResult: classToJsonSchema(TimeSlotResult),
        UpdatePasswordParams:  classToJsonSchema(UpdatePasswordParams),
        TokenSession: classToJsonSchema(TokenSession),
        RoleParams: classToJsonSchema(RoleParams),
        RoleResult: classToJsonSchema(RoleResult),
        PermissionParams: classToJsonSchema(PermissionParams),
        PermissionResult: classToJsonSchema(PermissionResult)
      },
    },
  },
  apis: [
    'src/application/routes-management/shared-routes/*.ts',
    'src/application/routes-management/scheduling-manager/*.ts',
    'src/application/routes-management/user-manager/*.ts',
  ],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
