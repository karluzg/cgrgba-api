import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681976578648 implements MigrationInterface {
    name = 'Default1681976578648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "age" TO "ages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "ages" TO "age"`);
    }

}
