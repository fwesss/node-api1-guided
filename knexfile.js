// Update with your config settings.

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/hubs.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
