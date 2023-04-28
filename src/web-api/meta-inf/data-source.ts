import "reflect-metadata"
import { DataSource } from "typeorm"

 export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Teste123#",
    database: "PORTAL_CONSULAR_DEV",
    synchronize: false, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: false, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: ["src/domain-model/*.{ts,js}"],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: ["src/migration/*.{ts,js}"],
    subscribers: []
 
})

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

 module.exports=myDataSource;


