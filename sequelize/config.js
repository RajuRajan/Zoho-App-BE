const timezone = 'Asia/Kolkata';
const defaultConfig = {
  dialect: 'postgres',
  operatorAliases: false,
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true,
    dateStrings: true,
    useUTC: false,
    timezone,
    typeCast: true,
  },
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  timezone,
};

module.exports.development = {
  ...defaultConfig,
  host: '127.0.0.1',
  database: 'zoholocal',
  username: 'admin',
  password: '123',
};

module.exports.staging = {
  ...defaultConfig,
  host: '127.0.0.1',
  database: 'zohostage',
  username: 'admin',
  password: '123',
};

module.exports.test = {
  ...defaultConfig,
  host: '127.0.0.1',
  database: 'zohotest',
  username: 'admin',
  password: '123',
};

module.exports.production = {
  ...defaultConfig,
  host: '127.0.0.1',
  database: 'zohoprod',
  username: 'admin',
  password: '123',
};
