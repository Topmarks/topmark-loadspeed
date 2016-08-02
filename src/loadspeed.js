import ChromeHelper from 'chrome-helper';

/**
 *  Public: Topmarks plugin that measures the time it takes to load a website.
 *
 *  * `app` An {Object} representing the app that registers the plugin
 *  * `options` An {Object} of options specific to this plugin (or from defaults)
 *
 *  ## Example
 *
 *     const topmarks = new Topmarks({loadspeed: {url: 'http://topcoat.io'}})
 *     topmarks.register('topmark-loadspeed')
 *     .then(() => {
 *       console.log(topmarks.results);
 *     });
 *
 *  Returns a {Promise} when finished.
 */
const loadspeed = (app, options) => {
  let requestStartTime;
  let requestEndTime;
  let loadtime;
  let chrome;
  const chromeHelper = new ChromeHelper(options.port, 'about:blank');
  return chromeHelper.startupChrome()
    .then((results) => {
      const returnPromise = new Promise((resolve) => {
        chrome = results[1];
        chrome.Network.enable();
        chrome.Page.enable();
        chrome.Network.requestWillBeSent(params => {
          // eslint-disable-next-line max-len
          requestStartTime = (typeof requestStartTime !== 'undefined') ? requestStartTime : params.timestamp;
        });
        chrome.Page.loadEventFired(params => {
          requestEndTime = params.timestamp;
          loadtime = parseFloat(requestEndTime) - parseFloat(requestStartTime);
          app.root.addResults(options.url, module.exports.attributes.name, loadtime);
          resolve();
        });
        chrome.once('ready', () => {
          chrome.Page.navigate({ url: options.url });
        });
      });
      return returnPromise;
    })
    .then(() => chromeHelper.shutdownChrome());
};

loadspeed.attributes = {
  pkg: require('../package.json'),
  name: 'loadspeed',
};

module.exports = loadspeed;
