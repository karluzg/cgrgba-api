import "reflect-metadata"
import { DataSource } from "typeorm"


export const myDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Nantoi01*",
    database: "portal_consular_dev",
    synchronize: true, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: false, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: ["src/domain/model/*.{ts,js}"],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: ["src/domain/meta-inf/migration/*.{ts,js}"]

})

module.exports = myDataSource;


