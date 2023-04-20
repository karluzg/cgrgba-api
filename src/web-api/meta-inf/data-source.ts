import "reflect-metadata"
import { DataSource } from "typeorm"


 export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Teste123#",
    database: "PORTAL_CONSULAR_DEV",
    synchronize: true,
    logging: false,
    entities: ["src/domain-model/*.{ts,js}"],
    migrationsTableName: "migrations",
    migrations: ["src/migration/*.{ts,js}"],
    subscribers: [],
})

// establish database connection


