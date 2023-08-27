module.exports = function(eleventyConfig) {
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
