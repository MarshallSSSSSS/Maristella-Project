document.addEventListener('DOMContentLoaded', function() {

	AOS.init();

	document.addEventListener("scroll", handleScroll);

	var scrollToTopBtn = document.querySelector(".scroll__btn");

	function handleScroll() {
	var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var GOLDEN_RATIO = 0.3;

	if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
		//show button
		if(!scrollToTopBtn.classList.contains("scroll__btn_show"))
		scrollToTopBtn.classList.add("scroll__btn_show");
	} else {
		//hide button
		if(scrollToTopBtn.classList.contains("scroll__btn_show"))
		scrollToTopBtn.classList.remove("scroll__btn_show");
	}
	}

	scrollToTopBtn.addEventListener("click", scrollToTop);

	function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
	}

});