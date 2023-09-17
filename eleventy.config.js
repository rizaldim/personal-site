module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("robots.txt");

	// Return your Object options:
	return {
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data"
		},
		markdownTemplateEngine: "njk"
	}
};
