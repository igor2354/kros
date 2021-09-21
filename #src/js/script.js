document.addEventListener(
	"DOMContentLoaded",
	function () {
        let swiper_portfolio = new Swiper(".portfolio-slider", {
			// Optional parameters
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,

			// autoplay: {
			// 	delay: 1000,
			// },

			// If we need pagination
			// pagination: {
			// 	el: ".example-slider__pagination",
			// },

			// Navigation arrows
			navigation: {
				nextEl: ".portfolio-slider__next",
				prevEl: ".portfolio-slider__prev",
			},

			// breakpoints: {
			// 	900: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 30,
			// 	},
			// },
		});

        let swiper_tenants = new Swiper(".tenants-slider", {
			// Optional parameters
			slidesPerView: "auto",
			spaceBetween: 20,
			loop: true,

			// autoplay: {
			// 	delay: 1000,
			// },

			// If we need pagination
			// pagination: {
			// 	el: ".example-slider__pagination",
			// },

			// Navigation arrows
			navigation: {
				nextEl: ".tenants__next",
				prevEl: ".tenants__prev",
			},

			// breakpoints: {
			// 	900: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 30,
			// 	},
			// },
		});
	},
	false
);