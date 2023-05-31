import "reflect-metadata"
import { DataSource } from "typeorm"
import { PlataformConfig } from "../../infrestructure/config/plataform";


export const myDataSource = new DataSource({
    type:"mysql",
    host:PlataformConfig.database.host,
    port: PlataformConfig.database.port,
    username: PlataformConfig.database.userName,
    password:PlataformConfig.database.password,
    database:PlataformConfig.database.database,
    synchronize: PlataformConfig.database.synchronize, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: PlataformConfig.database.logging, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: ["src/domain/model/*.{ts,js}"],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: ["src/domain/meta-inf/migration/*.{ts,js}"]

})

module.exports = myDataSource;


