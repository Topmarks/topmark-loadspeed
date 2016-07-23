import ChromeHelper from 'chrome-helper';

let loadspeed = (app, options) => {
  let requestStartTime,
      requestEndTime,
      loadtime,
      chrome;
  let chromeHelper = new ChromeHelper(options.port, "about:blank");
  return chromeHelper.startupChrome()
    .then((results) => {
      return new Promise((resolve, reject) => {
        chrome = results[1];
        chrome.Network.enable();
        chrome.Page.enable();
        chrome.Network.requestWillBeSent(params => {
          requestStartTime = (typeof requestStartTime != 'undefined')? requestStartTime: params.timestamp;
        });
        chrome.Page.loadEventFired(params => {
          requestEndTime = params.timestamp;
          loadtime = parseFloat(requestEndTime) - parseFloat(requestStartTime);
          app.root.addResults(options.url, module.exports.attributes.name, loadtime);
          resolve();
        });
        chrome.once('ready', () => {
          chrome.Page.navigate({url: options.url});
        });
      });
    })
    .then(() => chromeHelper.shutdownChrome());
}

loadspeed.attributes = {
  pkg: require('../package.json'),
  name: 'loadspeed'
}

module.exports = loadspeed;
