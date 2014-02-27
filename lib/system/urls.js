module.exports.reverse = function(url, obj) {
	return url.replace(/(\/:\w+\??)/g, function(m, c) {
		c = c.replace(/[/:?]/g, '');
		return obj[c] ? '/' + obj[c] : '';
	})
}