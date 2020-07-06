const dayjs = require('dayjs')

module.exports = value => {
	return dayjs(value).format('DD MMMM YYYY');
}
