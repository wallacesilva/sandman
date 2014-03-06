module.exports = function(controller){
	controller.get("/", function(req, res){
		res.render("index.html")
	});
}