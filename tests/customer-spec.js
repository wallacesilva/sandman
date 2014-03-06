var Customer = require("../models/customer")

describe('The Customer', function() {
	it('is created', function() {
		var customer = new Customer({
			name: "Patrick da Silveira Porto",
			email: "patrick.s.porto@gmail.com;",
			password: "123456",
			telephone: "(21) 0000-0000",
			mobile: "(21) 90000-0000",
			addressZipCode: "23.063-000",
			andressDetails: "Street Liberty"
		})

		customer.save(function(err) {
			expect(err).toBe(false);
		})
	});
})