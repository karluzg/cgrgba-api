import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682034141282 implements MigrationInterface {
    name = 'Default1682034141282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "capital" TO "capitals"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "capitals" TO "capital"`);
    }

}
