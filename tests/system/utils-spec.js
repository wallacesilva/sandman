var utils = require('../../lib/system/utils')

describe('The String', function() {
	it('interpolates a number in string', function() {
		var string = "{number} + {number} = 2".format({number: 1})
		expect(string).toEqual("1 + 1 = 2");
	});

	it('padding to left with zero', function() {
		var string = "1".padLeft(5, '0');
		expect(string).toEqual("00001");
	})

	it('padding to right with zero', function() {
		var string = "1".padRight(5, '0');
		expect(string).toEqual("10000");
	})

	it('padding to left with space', function() {
		var string = "ABC".padLeft(5);
		expect(string).toEqual("  ABC");
	})

	it('padding to right with space', function() {
		var string = "ABC".padRight(5);
		expect(string).toEqual("ABC  ");
	})
});

describe('The Date', function() {

	var date;

	beforeEach(function() {
		date = new Date(1994, 01, 20, 16, 48, 58, 0);
	})

	it('is formatted as month, day, year', function() {
		expect(date.format('m - d - Y')).toEqual('02 - 20 - 1994');
	});

	it('is formatted as month name, day, year', function() {
		expect(date.format('F d, Y')).toEqual('February 20, 1994');
	});

	it('is formatted as week name', function() {
		expect(date.format('D')).toEqual('Sun');
	});

	it('is formatted as week full name', function() {
		expect(date.format('l')).toEqual('Sunday');
	});

	it('is formatted as day without zero', function() {
		date.setDate('02')
		expect(date.format('j')).toEqual('2');
	});

	it('is formatted as month name, day, year, hours, minutes, seconds, milliseconds', function() {
		expect(date.format('F d, Y - H:i:s,u')).toEqual('February 20, 1994 - 16:48:58,0');
	});
});

describe('The Array', function() {
	var result;

	beforeEach(function() {
		result = ["test", "01test", "01", "test01"];
	})

	it('find by value', function() {
		expect(result.find(/^test/g)).toEqual(["test", "test01"]);
	});

	it('check if exists', function() {
		expect(result.exists("test")).toBe(true);
	});

	it('check if empty', function(){
		expect([].isEmpty()).toBe(true);
	});
})

describe('The Object Array' , function() {
	var object;

	beforeEach(function() {
		object = {
			'first name': "Patrick",
			'last name': "Porto",
			'email': "patrick.s.porto@gmail.com",
			'birthday': new Date(1994, 01, 20),
			'address' : "Street Rio de Janeiro",
			'__table__': "user"
		}
	})

	it('get keys exclude metakey', function() {
		var result = {
			'first name': "Patrick",
			'last name': "Porto",
			'email': "patrick.s.porto@gmail.com",
			'birthday': new Date(1994, 01, 20),
			'address' : "Street Rio de Janeiro"
		}
		expect(utils.dictExclude(object, /^(?!__)\w/g)).toEqual(result);
	});

	it('get metakeys exclude keys', function() {
		var result = {
			'__table__': "user"
		}
		expect(utils.dictExclude(object, /^__\w/g)).toEqual(result);
	});
});