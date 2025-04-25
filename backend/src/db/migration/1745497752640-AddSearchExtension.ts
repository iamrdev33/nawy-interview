import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSearchExtension1745497752640 implements MigrationInterface {
    name = 'AddSearchExtension1745497752640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION IF EXISTS pg_trgm;`);
    }

}
