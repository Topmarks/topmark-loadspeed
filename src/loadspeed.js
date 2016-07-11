let loadspeed = (app, options, next) => {
  let requestStartTime,
      requestEndTime;
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
        console.log(app.loadtime);
        app.Chrome.Close({port: options.port, id: tab.id}).then(() => {
          next();
        }).catch(err => next(err));
      });
      chrome.once('ready', () => {
        chrome.Page.navigate({url: options.url});
      });
    }).catch(err => next(err));
    next();
  }).catch(err => next(err));
}

loadspeed.attributes = {
  name: 'loadspeed',
  version: '0.1.0'
}

module.exports = loadspeed;
