const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.setTemplateFormats([ "html", "liquid", "njk", "md" ]);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/image");
  eleventyConfig.addPassthroughCopy("*.pdf");

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
			layouts: "_layouts",
    },
    pathPrefix: "/2024/",
  };
};
