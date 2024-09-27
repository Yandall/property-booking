import { createDatabase } from 'typeorm-extension';

(async () => {
  console.log('Creating database');
  await createDatabase({
    ifNotExist: true,
    options: {
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'property_booking',
    },
  });
})();
