import "reflect-metadata"
import { container } from "tsyringe"
import { DataSource } from "typeorm"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum } from "../model/enum/UserStatus"
import { IUserEngineRepository } from "../repository/IUserEngineRepository"
import { Permission } from "../model/Persmission"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Thales01*",
    database: "PORTAL_CONSULAR_DEV",
    synchronize: true, // set synchronize=false when is going to production environment to avoid auto-generated table
    logging: false, //The logging option in TypeORM allows you to enable or disable logging of database
    entities: ["src/domain/model/*.{ts,js}",Permission],
    migrationsTableName: "TABLE_MIGRATION",
    migrations: ["src/domain/meta-inf/migration/*.{ts,js}"],
    subscribers: []

})

module.exports = myDataSource;


