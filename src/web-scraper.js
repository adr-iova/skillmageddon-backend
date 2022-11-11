'use strict';

const scrape = require('website-scraper'); // only as ESM, no CommonJS
const options = {
  urls: ['https://www.toptal.com/resume/dasdsadas'],
  directory: 'test'
};

var rimraf = require("rimraf");
var HTMLParser = require('node-html-parser');


scrape(options).then(r => {
  const root = HTMLParser.parse(r[0].text);
  const htmlElems = root.querySelectorAll(".js-technologies");

  console.log(htmlElems.map(e => e.text.substring('Technologies: '.length)))
  rimraf("test", function () {
    console.log('deleted');
  });

})

