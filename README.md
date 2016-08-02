# Loadspeed

[![Build Status](https://travis-ci.org/Topmarks/topmark-loadspeed.svg?branch=master)](https://travis-ci.org/Topmarks/topmark-loadspeed) [![Code Climate](https://codeclimate.com/github/Topmarks/topmark-loadspeed/badges/gpa.svg)](https://codeclimate.com/github/Topmarks/topmark-loadspeed) [![Test Coverage](https://codeclimate.com/github/Topmarks/topmark-loadspeed/badges/coverage.svg)](https://codeclimate.com/github/Topmarks/topmark-loadspeed/coverage) [![Issue Count](https://codeclimate.com/github/Topmarks/topmark-loadspeed/badges/issue_count.svg)](https://codeclimate.com/github/Topmarks/topmark-loadspeed) [![Dependency Status](https://david-dm.org/topmarks/topmark-loadspeed.svg)](https://david-dm.org/topmarks/topmark-loadspeed) [![Inline docs](http://inch-ci.org/github/Topmarks/topmark-loadspeed.svg?branch=master)](http://inch-ci.org/github/Topmarks/topmark-loadspeed) [![npm version](https://badge.fury.io/js/topmark-loadspeed.svg)](https://badge.fury.io/js/topmark-loadspeed)

A [Topmarks](http://github.com/topmarks/topmarks) plugin to automate the testing of a website's loadspeed in chrome.

## Installation

Install from npm [npm](https://docs.npmjs.com/getting-started/installing-node).

```sh
npm install topmark-loadspeed
```

## Usage

### Nodejs

```js
const Topmarks = require('topmarks');

const options = {
  loadspeed: { //This will pass these options to only this plugin, alternatively you can use default for all plugins
    port: 9222 //Chrome debugging port - defaults to 9222
    url: 'http://topcoat.io' //url to test, defaults to http://topcoat.io
  }
};

let topmarks = new Topmarks(options);
topmarks.register('topmark-loadspeed').then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

### CLI

If using the command line tool for Topmarks it needs to be installed globally, as well as any plugins.

```sh
npm install -g topmarks topmark-loadspeed
```

```sh
$ topm --url http://topcoat.io --plugins topmark-loadspeed

[ { plugin: 'loadspeed',
   url: 'http://topcoat.io',
   timestamp: 1468518500472,
   report: 0.2747849998995662 } ]
```

## Sample Report

Should return a report similar to this:

```js
[ { plugin: 'loadspeed',
    url: 'http://topcoat.io',
    timestamp: 1468518500472,
    report: 0.2747849998995662 } ]
```
