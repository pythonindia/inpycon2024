module.exports = function (eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.setTemplateFormats([ "html", "liquid", "njk", "md" ]);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/image");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
			layouts: "_layouts",
    },
  };
};
