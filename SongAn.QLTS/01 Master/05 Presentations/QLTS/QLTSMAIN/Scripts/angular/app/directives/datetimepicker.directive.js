(function () {
	'use strict';
	angular.module('app')
		.directive('datetimepicker', datetimepicker);

	function datetimepicker() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function (scope, element, attrs, ngModelCtrl) {
				var format = attrs.dateFormat || 'DD/MM/YYYY HH:mm';
				var parent = angular.element(element).parent();
				var dtp = parent.datetimepicker();
				dtp.on("dp.change", function (e) {
					if (e.date) {
						ngModelCtrl.$setViewValue(moment(e.date).format(format));
						scope.$apply();
					}
				});
			}
		};
	}
})();

