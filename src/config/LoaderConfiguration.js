const dotenv = require('dotenv');
const pathFileConfigure = process.env.NODE_ENV == "dev" ? "./.env" : `./.env-${process.env.NODE_ENV}`;
dotenv.config({ path: pathFileConfigure });
