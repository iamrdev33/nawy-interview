import { MigrationInterface, QueryRunner } from "typeorm";

export class ApartmentProjectAndContact1745497696262 implements MigrationInterface {
    name = 'ApartmentProjectAndContact1745497696262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "mail" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."apartment_listingtype_enum" AS ENUM('sale', 'rent')`);
        await queryRunner.query(`CREATE TYPE "public"."apartment_status_enum" AS ENUM('active', 'pending', 'sold', 'rented', 'expired', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "apartment" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "city" character varying NOT NULL, "fullAddress" character varying NOT NULL, "listingType" "public"."apartment_listingtype_enum" NOT NULL, "status" "public"."apartment_status_enum" NOT NULL DEFAULT 'active', "price" numeric(12,2) NOT NULL, "areaInSqM" integer NOT NULL, "bedrooms" integer NOT NULL, "bathrooms" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectId" integer, "contactId" integer, CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "apartment" ADD CONSTRAINT "FK_ef47ee9abf1fe8c3f9592cabcc3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apartment" ADD CONSTRAINT "FK_56675836629f4de275439210f78" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apartment" DROP CONSTRAINT "FK_56675836629f4de275439210f78"`);
        await queryRunner.query(`ALTER TABLE "apartment" DROP CONSTRAINT "FK_ef47ee9abf1fe8c3f9592cabcc3"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "apartment"`);
        await queryRunner.query(`DROP TYPE "public"."apartment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."apartment_listingtype_enum"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
