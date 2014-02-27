var i18n = require('./locale');

String.prototype.format = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

String.prototype.padLeft = function (padLength, padString) {
	if(padString == undefined) padString = " ";

	var stringFormatted = this;

	for(var i = this.length; i < padLength; i++) {
		stringFormatted = padString.toString() + stringFormatted;
	}

	return stringFormatted;
}

String.prototype.padRight = function (padLength, padString) {
	if(padString == undefined) padString = " ";

	var stringFormatted = this;

	for(var i = this.length; i < padLength; i++) {
		stringFormatted += padString.toString();
	}

	return stringFormatted;
}

Date.prototype.format = function (dateFormat) {
	var date = this;
	var dateFormatted = "";

	var weeks = i18n.__("system.data.weeks");
	var shortWeeks = Object.keys(weeks);
	var months = i18n.__("system.data.months");
	var shortMonths = Object.keys(months);

	var patterns = {
		'd': date.getDate().toString().padLeft(2, '0'),
		'j': date.getDate(),
		'm': (date.getMonth() + 1).toString().padLeft(2, '0'),
		'Y': date.getFullYear(),
		'F': months[shortMonths[date.getMonth()]],
		'l': weeks[shortWeeks[date.getDay()]],
		'D': shortWeeks[date.getDay()],
		'H': date.getHours().toString().padLeft(2, '0'),
		'i': date.getMinutes(),
		's': date.getSeconds(),
		'u': date.getMilliseconds()
	}

	for(var i = 0; i < dateFormat.length; i++) {
		var pattern = patterns[dateFormat[i]];

		if(pattern == undefined) {
			dateFormatted += dateFormat[i];
		} else {
			dateFormatted += pattern;
		}
	}

	return dateFormatted;
}

Array.prototype.find = function(regex) {
	var result = [];

	for(var i = 0; i < this.length; i++){
		if(this[i].match(regex)) {
			result.push(this[i]);
		}
	}

	return result;
}

Array.prototype.exists = function(regex) {
	for(var i = 0; i < this.length; i++){
		if(this[i].match(regex)) {
			return true;
		}
	}

	return false;
}

Array.prototype.isEmpty = function() {
	return this.length == 0;
}

function dictExclude(object, regex) {
	if (regex == undefined) regex = "";
	var result = {};

	for(var i = 0; i < Object.keys(object).length; i++){
		var key = Object.keys(object)[i];
		if(key.match(regex)) {
			result[key] = object[key];
		}
	}

	return result;
}

module.exports = {
	dictExclude: dictExclude
}