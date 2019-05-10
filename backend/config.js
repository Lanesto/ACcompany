module.exports = {
  app: {
    cookie: {
      name  : 'CS', // cookie-session
      keys  : ['apple'],
      maxAge: 3 * 60 * 60 * 1000 // in millisecond
    }
  },
  database: {
    // using MySQL
    // default port is 3306
    heroku: { // just a form, app does not exists
      host              : 'us-cdbr-iron-east-02.cleardb.net',
      user              : 'bfcdc1ec575fe1',
      password          : '66df6411',
      port              : 3306,
      database          : 'heroku_f5e4e578663080e',
      multipleStatements: true
    },
    local: {
      host              : 'localhost',
      user              : 'root',
      password          : '9306',
      port              : 3306,
      database          : 'dev',
      multipleStatements: true
    }
  },
  auth: {
    crypto: {
      iteration: 10983,
      digest   : 'sha256',
      keylen   : 64
    }
  },
  oauth2_0: {
    naver: {
      clientID    : 'Jg2QZYiAUjlzWGWFqHPq',
      clientSecret: 'i9MmWtf6R7',
      callbackURL : 'http://localhost:3000/auth/login/naver/callback',
    },
    kakao: {
      clientID   : 'af4928eb27e4a247436ec5e7d7434f5c',
      callbackURL: 'http://localhost:3000/auth/login/kakao/callback'
    }
  }
}

