let loadspeed = (app, options) => {
  let requestStartTime,
      requestEndTime;
  return new Promise((resolve, reject) => {
    app.Chrome.New({port: options.port, url: "about:blank"}).then((tab) => {
      app.Chrome({port: options.port}).then((chrome) => {
        chrome.Network.enable();
        chrome.Page.enable();
        chrome.Network.requestWillBeSent(params => {
          requestStartTime = (typeof requestStartTime != 'undefined')? requestStartTime: params.timestamp;
        });
        chrome.Page.loadEventFired(params => {
          requestEndTime = params.timestamp;
          app.loadtime = parseFloat(requestEndTime) - parseFloat(requestStartTime);
          app.Chrome.Close({port: options.port, id: tab.id}).then(() => {
            app.root.addResults(options.url,module.exports.attributes.name,app.loadtime);
            resolve();
          });
        });
        chrome.once('ready', () => {
          chrome.Page.navigate({url: options.url});
        });
      });
    }).catch(err => reject(err));
  });
}

loadspeed.attributes = {
  pkg: require('../package.json'),
  name: 'loadspeed'
}

module.exports = loadspeed;
