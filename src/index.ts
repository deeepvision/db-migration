import { asyncExec } from './helpers';
import migrations from './migrations';
export const DUMP_DIR = 'ENTER_DUMP_DIR_HERE';

const bootstrap = async () => {
  for (const migration of migrations) {
    console.log(`Migration: ${migration.name}`);

    console.log(`Dump from db: ${migration.db.name}...`);

    await asyncExec(
      `mongodump \\
        -v \\
        --host localhost \\
        --port ${migration.db.port} \\
        --username ${migration.db.username} \\
        --password ${migration.db.password} \\
        --forceTableScan \\
        --authenticationDatabase admin -d ${migration.db.name} \\
        --archive=${DUMP_DIR}/${migration.db.name}.archive
    `,
    );

    console.log(`Upload to Atlas...`);

    await asyncExec(
      `mongorestore \\
        --uri "${migration.atlas.uri}" \\
        --drop \\
        --archive=${DUMP_DIR}/${migration.db.name}.archive \\
        --nsFrom='${migration.db.name}.*' \\
        --nsTo='${migration.atlas.dbName}.*'`,
    );

    console.log(`Done!`);
  }
};

bootstrap();
