import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  database: {
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'deliveryProject',
  },
});
