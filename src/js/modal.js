document.addEventListener('DOMContentLoaded', function() {

	MicroModal.init({
		openTrigger: 'data-custom-open',
		closeTrigger: 'data-custom-close',
		disableScroll: true,
		disableFocus: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	});

	[].forEach.call( document.querySelectorAll('.tel'), function(input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+38 (___) ___ ____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function(a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function(a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5)  this.value = ""
		}
	
		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)
	
	  });

	  jQuery(($) => {
		$('.select').on('click', '.select__head', function () {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
				$(this).next().fadeOut();
			} else {
				$('.select__head').removeClass('open');
				$('.select__list').fadeOut();
				$(this).addClass('open');
				$(this).next().fadeIn();
			}
		});
	
		$('.select').on('click', '.select__item', function () {
			$('.select__head').removeClass('open');
			$(this).parent().fadeOut();
			$(this).parent().prev().text($(this).text());
			$(this).parent().prev().prev().val($(this).text());
		});
	
		$(document).click(function (e) {
			if (!$(e.target).closest('.select').length) {
				$('.select__head').removeClass('open');
				$('.select__list').fadeOut();
			}
		});
	});
});