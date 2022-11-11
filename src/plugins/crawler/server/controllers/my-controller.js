'use strict';

var rimraf = require("rimraf");
var HTMLParser = require('node-html-parser');
const scrape = require('website-scraper'); // only as ESM, no CommonJS
const _ = require("lodash");

module.exports = ({ strapi }) => ({
  async start(ctx) {
    const page = scrape(options)
    const root = HTMLParser.parse(page[0].text);
    const htmlElems = root.querySelectorAll(".js-technologies");

    rimraf("test", function () {
      console.log('deleted');
    });

    let skillsArray = [];

    htmlElems.map(e => e.text.substring("Technologies: ".length).split(","))
      .forEach(skill => {
        const cleanSkill = skill.trim();
        if (!skillsArray.includes(cleanSkill)) {
          skillsArray.push(cleanSkill)
        }
      })

    skillsArray = _.uniq(skillsArray);

    strapi.service('api::skill.skill').fin

    if (!htmlElems.length) {
      ctx.send({
        message: 'User does not exist or does not have any skills'
      }, 404);
    }
  },
});
