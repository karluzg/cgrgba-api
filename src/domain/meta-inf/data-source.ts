import "reflect-metadata"
import { DataSource } from "typeorm"
import { PlataformConfig } from "../../infrestructure/config/plataform";
import { join } from "path";

export const myDataSource = new DataSource({
    type:"mysql",
    host:PlataformConfig.database.host,
    port: PlataformConfig.database.port,
    username: PlataformConfig.database.userName,
    password:PlataformConfig.database.password,
    database:PlataformConfig.database.database,
    synchronize: PlataformConfig.database.synchronize, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: PlataformConfig.database.logging, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: [join(__dirname, '../model','*.{ts,js}')],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: [join(__dirname, '../meta-inf',"migration/*.{ts,js}")]

})

console.log(join(__dirname, '../model','*.{ts,js}'))
module.exports = myDataSource;


