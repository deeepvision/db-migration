import migrations from './migrations';

for (const migration of migrations) {
  console.log(
    `ssh -fN -i ./id_rsa -L ${migration.db.port}:localhost:${migration.db.port} ${process.argv[2]}`,
  );
}
