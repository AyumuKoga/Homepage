module.exports = function(eleventyConfig) { eleventyConfig.addPassthroughCopy("node_modules/jquery/dist/jquery.min.js"); return { dir: { input: "src", output: "_site" } } };
