import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '5555',
  database: 'User_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,

};

export = config