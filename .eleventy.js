const { DateTime } = require('luxon');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require('markdown-it')

const shortcodePostcss = require('./_includes/shortcodes/postcss');

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(pluginNavigation)

  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
  })

  eleventyConfig.addPairedAsyncShortcode("postcss", shortcodePostcss );

  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }))

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
    ],
    dir: {
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};
