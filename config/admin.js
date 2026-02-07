module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "someSecretKey1"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "someRandomSalt1"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "anotherRandomSalt1"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
