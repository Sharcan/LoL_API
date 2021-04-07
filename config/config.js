const env = process.env.NODE_ENV || 'development';

//fetch environnement config
const config = require('./config.json');
const envConfig = config[env];

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);