module.exports = {
  "type": "postgres",
  "url": "postgresql://root:password@0.0.0.0/user_service",
  "entities": [
    "src/infrastructure/database/entities/**/*.ts"
  ],
  "migrations": [
    "src/infrastructure/database/migrations/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/infrastructure/database/migrations"
  },
};
