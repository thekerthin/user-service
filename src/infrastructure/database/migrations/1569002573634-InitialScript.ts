import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialScript1569002573634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";', undefined);
        await queryRunner.query('CREATE TABLE "securities" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "nickname" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_7cb2e4f3926096a2d74fbc9fc1c" UNIQUE ("nickname"), CONSTRAINT "PK_2f2a80064c5bce5a8ff134a38a8" PRIMARY KEY ("id"))', undefined);
        await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "names" character varying(100) NOT NULL, "surnames" character varying(100) NOT NULL, "nickname" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "birthday" TIMESTAMP NOT NULL, "description" character varying, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))', undefined);
        await queryRunner.query('CREATE TABLE "social_media_accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, "url" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_1d867fd935a03bb03d5d4c61a05" PRIMARY KEY ("id"))', undefined);
        await queryRunner.query('ALTER TABLE "social_media_accounts" ADD CONSTRAINT "FK_c699ca1c62cd9707420e4acab90" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE "social_media_accounts" DROP CONSTRAINT "FK_c699ca1c62cd9707420e4acab90"', undefined);
        await queryRunner.query('DROP TABLE "social_media_accounts"', undefined);
        await queryRunner.query('DROP TABLE "users"', undefined);
        await queryRunner.query('DROP TABLE "securities"', undefined);
    }

}
