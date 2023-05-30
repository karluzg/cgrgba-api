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
import { RoleResult } from './application/model/user-manager/RoleResult ';
import { ResetPasswordParams } from './application/model/user-manager/ResetPasswordParams';
import { NewsParams } from './application/model/news-manager/NewsParams';
import { NewsResult } from './application/model/news-manager/NewsResult';
import { GetSchedulingListResult } from './application/model/scheduling-manager/scheduling/GetSchedulingListResult';
import { UpdateSchedulingParams } from './application/model/scheduling-manager/scheduling/params/UpdateSchedulingParams';
import { Scheduling } from './domain/model/Scheduling';
import { SchedulingStatus } from './domain/model/SchedulingStatus';
import { Hour } from './domain/model/Hour';
import { RoleResultList } from './application/model/user-manager/RoleResultList';
import { PermissionResult } from './application/model/user-manager/PermissionResult';
import { UserResultList } from './application/model/user-manager/UserResultList';
import { NewsResultList } from './application/model/news-manager/NewsResultList';
import { PermissionGroup } from './domain/model/PermissionGroup';
import { PermissionGroupParams } from './application/model/user-manager/PermissionGroupParams';
import { PermissionGroupResult } from './application/model/user-manager/PermissionGroupResult';
import { PermissionGroupResultList } from './application/model/user-manager/PermissionGroupResultList';
import { PermissionResultList } from './application/model/user-manager/PermissionResultList';
import { PlataformConfig } from './infrestructure/config/plataform';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API da plataforma do Consulado Geral da Republica da Guiné-Bissau na Albufeira',
      version: '1.0.0',
    },
    servers: [
      {
        url: PlataformConfig.url.baseUrl,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: classToJsonSchema(User),
        UserParams: classToJsonSchema(UserParams),
        UserResult: classToJsonSchema(UserResult),
        UserResultList: classToJsonSchema(UserResultList),
        UserLoginResult: classToJsonSchema(UserLoginResult),
        UserLoginParams: classToJsonSchema(UserLoginParams),
        SchedulingParams: classToJsonSchema(SchedulingParams),
        SchedulingResult: classToJsonSchema(SchedulingResult),
        Scheduling: classToJsonSchema(Scheduling),
        SchedulingStatus: classToJsonSchema(SchedulingStatus),
        TimeSlotListParams: classToJsonSchema(TimeSlotListParams),
        TimeSlotParams: classToJsonSchema(TimeSlotParams),
        TimeSlotResult: classToJsonSchema(TimeSlotResult),
        Hour: classToJsonSchema(Hour),
        UpdatePasswordParams: classToJsonSchema(UpdatePasswordParams),
        TokenSession: classToJsonSchema(TokenSession),
        RoleParams: classToJsonSchema(RoleParams),
        RoleResult: classToJsonSchema(RoleResult),
        RoleResultList: classToJsonSchema(RoleResultList),
        PermissionParams: classToJsonSchema(PermissionParams),
        PermissionResult: classToJsonSchema(PermissionResult),
        PermissionResultList: classToJsonSchema(PermissionResultList),
        PermissionGroupParams: classToJsonSchema(PermissionGroupParams),
        PermissionGroupResult: classToJsonSchema(PermissionGroupResult),
        PermissionGroupResultList: classToJsonSchema(PermissionGroupResultList),
        ResetPasswordParams: classToJsonSchema(ResetPasswordParams),
        NewsParams: classToJsonSchema(NewsParams),
        NewsResult: classToJsonSchema(NewsResult),
        NewsResultList: classToJsonSchema(NewsResultList),
        GetSchedulingListResult: classToJsonSchema(GetSchedulingListResult),
        UpdateSchedulingParams: classToJsonSchema(UpdateSchedulingParams),
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ]
  },
  apis: [
    'src/application/routes-management/shared-routes/*.ts',
    'src/application/routes-management/scheduling-manager/*.ts',
    'src/application/routes-management/user-manager/*.ts',
    'src/application/routes-management/news-manager/*.ts',
  ],


};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use(PlataformConfig.url.api, swaggerUi.serve, swaggerUi.setup(specs));
};
