import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ProfileStateCreateTable1605291464358
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_stages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'target',
            type: 'numeric',
          },
          {
            name: 'skills',
            type: 'json',
          },
          {
            name: 'initial',
            type: 'boolean',
          },
          {
            name: 'state',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'Now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'Now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'profile_stages',
      new TableForeignKey({
        name: 'profileId',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('profile_stages', 'providerId');

    await queryRunner.dropTable('profile_stages');
  }
}
