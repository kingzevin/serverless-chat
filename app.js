/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

const logger = require('logger-sharelatex')
const settings = require('settings-sharelatex')

const Server = require('./app/js/server')

  // Called directly
  const port =
    __guard__(
      settings.internal != null ? settings.internal.chat : undefined,
      x => x.port
    ) || 3010
  const host =
    __guard__(
      settings.internal != null ? settings.internal.chat : undefined,
      x1 => x1.host
    ) || 'localhost'
  Server.server.listen(port, host, function(error) {
    if (error != null) {
      throw error
    }
    return logger.info(`Chat starting up, listening on ${host}:${port}`)
  })

// module.exports = Server.server

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null
    ? transform(value)
    : undefined
}

exports.main = test
function test(params = {}) {
  // params e.g.: {
  //  url: '/user/5e9723ee71ffbe00909ed452/contacts',
  //  method: 'get',
  // }
  
  const url = params.__ow_path || '/project/5ee9ea6bd9085c0007b38bfe/messages';
  const method = params.__ow_method || 'get';

  const { promisify } = require('util')
  const request = require("request")
  const reqPromise = promisify(request[method]);

  return (async () => {
    const result = await reqPromise({
      url: `http://${host}:${port}${url}`,
      json: params
    })
    return result
  })();
}

if (!module.parent) {
  (async ()=>{
    let a = await test();
    console.log(a);
  })();
}