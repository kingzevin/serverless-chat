module.exports = {
  internal: {
    chat: {
      host: process.env['LISTEN_ADDRESS'] || 'localhost',
      port: 3010
    }
  },

  mongo: {
    url:
      `mongodb://172.17.0.1:27017/sharelatex`
  },

}
