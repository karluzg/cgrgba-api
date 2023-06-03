const dotenv = require('dotenv');


dotenv.config(); // Carrega o arquivo .env por padrão

export const PlataformConfig = {
    contact: {
        email: process.env.CONTACT_EMAIL,
        number: process.env.CONTACT_NUMBER,
    },
    url: {
        frontOffice: process.env.URL_FRONTOFFICE,
        backOffice: process.env.URL_BACKOFFICE,
        api: process.env.URL_API,
        baseUrl: process.env.URL_BASE
    },
    security: {
        passwordTry: parseInt(process.env.SECURITY_PASSWORD_TRY),
        encryptionKey12: process.env.SECURITY_ENCRYPTION_KEY_12,
        encryptionKey16: process.env.SECURITY_ENCRYPTION_KEY_16
    },
    email: {
        host: process.env.EMAIL_HOTS,
        email: process.env.EMAIL_EMAIL,
        password: process.env.EMAIL_PASSWORD,
        port: parseInt(process.env.EMAIL_PORT)
    },
    server: {
        port: parseInt(process.env.SERVER_PORT),
        uploadFolder: process.env.SERVER_UPLOAD_FOLDER,
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        userName: process.env.DATABASE_USER_NAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
        logging: process.env.DATABASE_LOGGING === "true"
    },
    nantoi: {
        email: process.env.NANTOI_USER_EMAIL,
        fullName: process.env.NANTOI_USER_FULL_NAME,
        mobileNumaber: process.env.NANTOI_USER_MOBILE_NUMBER,
        password: process.env.NANTOI_USER_PASSWORD
    }
    ,
    log: {
        file: process.env.LOG_FILE,
        level: process.env.LOG_LEVEL
    }

}