const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('./src/filters/date-filter.js');

module.exports = config => {
	config.addPassthroughCopy('./src/css/');

	config.addCollection('posts', collection => {
		return [...collection.getFilteredByGlob('./src/content/posts/*.md')]
			.reverse();
	});

	config.addPlugin(syntaxHighlight);

	config.addFilter('dateFilter', dateFilter);

	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
			output: 'dist'
		}
	};
};
