import "reflect-metadata"
import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Teste123#",
    database: "PORTAL_CONSULAR_DEV",
    synchronize: true, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: true, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: ["src/domain/model/*.{ts,js}"],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: ["src/domain/meta-inf/migration/*.{ts,js}"],
    subscribers: []

})

module.exports = myDataSource;


