export const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || '6379',
  db: parseInt(process.env.REDIS_DB) || '0',
  password: process.env.REDIS_PASSWORD || '',
  keyPrefix: process.env.REDIS_PRIFIX || '',
}