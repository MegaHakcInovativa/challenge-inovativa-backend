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
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'skills',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'initial',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropForeignKey('profile_stages', 'profileId');

    await queryRunner.dropTable('profile_stages');
  }
}
