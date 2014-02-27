var core = require("../../lib/system/core");

describe('The config', function() {
	it('has defaultlocale', function() {
		expect(core.getConfig('defaultlocale')).toBeDefined();
	});

	it('has database', function() {
		expect(core.getConfig('database')).toBeDefined();
	})
})