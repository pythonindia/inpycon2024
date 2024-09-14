const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  let markdownItOptions = {
    html: true, // you can include HTML tags
  };

  let markdownItAnchorOptions = {
    level: 2, // minimum level header -- anchors will only be applied to h2 level headers and below but not h1
    permalink: true,
  };
  // Copy static assets to output
  eleventyConfig.setTemplateFormats(["html", "liquid", "njk", "md"]);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/image");
  eleventyConfig.addPassthroughCopy("*.pdf");

  eleventyConfig.setLibrary(
    "md",
    markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions)
  );
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
