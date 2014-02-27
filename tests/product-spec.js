var Product = require('../models/product')

describe('The product', function(){
	it('is created', function() {
		var product = Product({
			name: "book"
		});

		product.save(function(err) {
			except(err).toBe(false);
		});
	});
});