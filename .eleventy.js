module.exports = function (eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.setTemplateFormats([ "html", "liquid", "njk" ]);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/image");
  eleventyConfig.addPassthroughCopy("src/coc.html");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
			layouts: "_layouts",
    },
  };
};
