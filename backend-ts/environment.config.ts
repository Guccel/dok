require('dotenv').config();
export default {
  PORT: process.env.PORT || 3000,
  BASE_URL: process.env.BASE_URL,
  IS_PRODUCTION: process.env.IS_PRODUCTION,
  MONGODB_URI: process.env.MONGODB_URI || '',
};
