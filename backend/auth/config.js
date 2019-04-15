module.exports = {
  // secret is a digest as a random value
  jwt: {
    access: {
      secret: 'e5bbb6124a44f87a04a0a54a9e3994458be471c6937988be5bce189d057e6efc',
      options: {
        algorithm: 'HS256',
        expiresIn: '15m'
      }
    },
    refresh: {
      secret: 'c9a8231a473f675b7124447653c89acd51738c57608b2d10c39090ef61a468b9',
      options: {
        algorithm: 'HS512',
        expiresIn: '12h'
      }
    }
  },
  crypto: {
    iteration: 10983,
    digest: 'sha256',
    keylen: 64
  }
}