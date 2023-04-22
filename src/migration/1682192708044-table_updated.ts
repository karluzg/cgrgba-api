import { MigrationInterface, QueryRunner } from "typeorm";

export class TableUpdated1682192708044 implements MigrationInterface {
    name = 'TableUpdated1682192708044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "ages" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ages"`);
    }

}
