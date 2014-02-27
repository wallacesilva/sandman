var i18n = require("i18n"),
	core = require("./core");

i18n.configure({
    locales: core.getConfig('locales'),
    defaultLocale: core.getConfig('defaultlocale'),
    directory: __dirname + '/../../locales',
    extension: '.json'
});

module.exports = i18n;