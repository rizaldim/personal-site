const { DateTime } = require("luxon");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addPassthroughCopy("robots.txt");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toISODate();
	});

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
