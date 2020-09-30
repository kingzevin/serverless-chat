/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
process.env["MONGO_CONNECTION_STRING"] = `mongodb://172.17.0.1:27017/sharelatex`;
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

exports.main = main
function main(params = {}){
  const url = params.__ow_path
  const method = params.__ow_method
  const headers = params.__ow_headers
  
  const { promisify } = require('util')
  const request = require("request")
  const reqPromise = promisify(request[method]);
  return (async () => {
    let result;
    let opt={}
    opt['headers'] = headers;
    opt['url'] = `http://${host}:${port}${url}`;
    let str = params.__ow_body || '';
    if(str !== "" && Buffer.from(str, 'base64').toString('base64') === str){
      // base64
      params.__ow_body = Buffer.from(str, 'base64').toString('ascii');
    }
    opt['body'] = params.__ow_body;
    if(params.__ow_query !== ""){
      const qs = '?' + params.__ow_query;
      opt['url'] = opt['url'] + qs;
    }
    result = await reqPromise(opt);
    var response = JSON.parse(JSON.stringify(result));
    delete response.request
    return response
  })();
}