(function () {
	'use strict';
	var app = angular.module('app');
	app.filter('number', function () {
	    return function (data, commas, decimal, length) {
	        if (angular.isUndefined(data)) { return 0; }
	        commas = commas || '.';
	        decimal = decimal || ',';
	        length = length === undefined ? -1 : length;
	        data += '';
	        var x = data.split('.');
	        var x1 = x[0];
	        var x2 = x.length > 1 && x[1].length > 0 ? decimal + x[1] : '';
	        var rgx = /(\d+)(\d{3})/;
	        while (rgx.test(x1)) {
	            x1 = x1.replace(rgx, '$1' + commas + '$2');
	        }
	        if (length > -1) {
	            x2 = x2.substring(0, length + 1);
	        }
	        return x1 + x2;
	    };
	});

    //app.filter('number', [
	//	function () { // should be altered to suit your needs
	//		var formatter = new Intl.NumberFormat();
	//		return function (input) {
	//			var ret = formatter.format(input);
	//			return ret;
	//		};
	//	}]);
})();