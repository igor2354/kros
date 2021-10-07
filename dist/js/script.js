document.addEventListener(
	"DOMContentLoaded",
	function () {
        let swiper_portfolio = new Swiper(".portfolio-slider", {
			// Optional parameters
			slidesPerView: 1,
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
				nextEl: ".portfolio-slider__next",
				prevEl: ".portfolio-slider__prev",
			},

			breakpoints: {
				700: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1170: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});

        let swiper_tenants = new Swiper(".tenants-slider", {
			// Optional parameters
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,

			on: {
				resize: function() {
					this.slides.forEach(element => {
						element.style.height = element.clientWidth + "px";
					});
				},

				afterInit: function() {
					this.slides.forEach(element => {
						element.style.height = element.clientWidth + "px";
					});
				}
			},

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

			breakpoints: {
				370: {
					slidesPerView: 2,
					spaceBetween: -10,
				},
				500: {
					slidesPerView: 3,
					spaceBetween: -20,
				},
				900: {
					slidesPerView: 4,
					spaceBetween: -20,
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: -20,
				},

				1500: {
					slidesPerView: 6,
					spaceBetween: -20,
				},
			},
		});

		let swiper_about = new Swiper(".main-slider", {
			// Optional parameters
			slidesPerView: 1,
			spaceBetween: 0,
			loop: false,
			watchOverflow: true,

			// autoplay: {
			// 	delay: 1000,
			// },

			// If we need pagination
			pagination: {
				el: ".slider-pagination",
			},

			// Navigation arrows
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});

		let sliderTeam = Array.prototype.slice.call(document.querySelectorAll(".js-slider-team"));

		if (sliderTeam.length > 0) {
			sliderTeam.forEach(element => {
				let centerImage = element.querySelector(".team__center-image");
				let curentSrcImage = centerImage.getAttribute("src");

				let swiper_team = new Swiper( element.querySelector(".team__container"), {
					// Optional parameters
					slidesPerView: 1,
					spaceBetween: 20,
					loop: true,

					breakpoints: {
						500: {
							spaceBetween: 20,
							slidesPerView: 2,
						},

						600: {
							spaceBetween: 40,
							slidesPerView: 2,
						},

						700: {
							spaceBetween: 60,
							slidesPerView: 2,
						},
						
						800: {
							spaceBetween: 120,
							slidesPerView: 2,
						},
					},
		
					on: {
						afterInit: function() {
							let activeSlideSrc = this.slides[this.activeIndex].querySelector("img") ? this.slides[this.activeIndex].querySelector("img").getAttribute("src") :  curentSrcImage;
							centerImage.setAttribute("src", activeSlideSrc);
						},

						slideChange: function() {
							let activeSlideSrc = this.slides[this.activeIndex].querySelector("img") ? this.slides[this.activeIndex].querySelector("img").getAttribute("src") :  curentSrcImage;
							centerImage.setAttribute("src", activeSlideSrc);
						}
					}
				});
			});
		}

	},
	false
);

$(document).ready(function () {
	let match = [window.matchMedia("(max-width: 1170px)")];

	// Расставляем точки на карте
	$.each($(".our-offices__item"), function (index, val) {
		let coordinatesTop = $(val).attr("data-coordinates-top");
		let coordinatesLeft = $(val).attr("data-coordinates-left");

		$(val).css({ top: coordinatesTop, left: coordinatesLeft });
	});

	$.each($(".our-offices__info"), function(index, val) {
		if ($(window).width() < $(val).offset().left + $(val).innerWidth()) {
			$(val).addClass("--right");
		}
	});

	$(window).on("resize", function() {
		$.each($(".our-offices__info"), function(index, val) {
			if ($(window).width() < $(val).offset().left + $(val).innerWidth()) {
				$(val).addClass("--right");
			}
		});
	});


	$(".close-map").on("click", function() {
		$(this).parents(".our-offices__item").removeClass("active");
		$(this).parents(".our-offices__info").removeClass("active");
	});

	$(".our-offices__icon-marker").on("click", function() {
		$(".our-offices__item").removeClass("active");
		$(".our-offices__info").removeClass("active");

		$(this).parents(".our-offices__item").addClass("active");

		$(`.our-offices__info[data-city=${$(this).parents(".our-offices__item").attr("data-city")}]`).addClass("active");
	});

	function moveMapHint() {
		if (match[0].matches) {
			$.each($(".our-offices__info"), function(index, val) {
				$(".container-section__list").append($(val));
			});

			$(".our-offices__icon-marker").eq(0).click();
		} else {
			$.each($(".our-offices__info"), function(index, val) {
				let dataCity = $(val).attr("data-city");

				$(`.our-offices__item[data-city=${dataCity}]`).append($(val));
			});
		}
	};

	moveMapHint();
	match[0].addListener(moveMapHint);



	// Клон элементов в мобильное меню

	$.each($(".js-mobile-menu > li"), function (index, val) {
		let clone = $(val).clone();
		$("#menu > ul").append(clone);
	});
	// Активация мобильного меню

	$("#menu").mmenu({
		extensions: ["pagedim-black", "position-left"],
		navbar: {
			title: "Меню",
		},
	});

	var $menu = $("#menu");
	var $icon = $(".mobile-menu");
	var API = $menu.data("mmenu");

	function openMenu() {
		API.open();
	}

	function closeMenu() {
		API.close();
	}
	$icon.on("click", openMenu);
	API.bind("open:finish", function () {
		$icon.addClass("is-active");
		$("html").addClass("lock");
	});
	API.bind("close:finish", function () {
		$icon.removeClass("is-active");
		$("html").removeClass("lock");
	});

	$(window).scroll(function (e) {
		if ($(this).scrollTop() > 0) {
		  $('#scroller').fadeIn();
		} else {
		  $('#scroller').fadeOut();
		}
	  });
	  $('#scroller').click(function (e) {
		e.preventDefault();
		$('body,html').animate({ scrollTop: 0 }, 400);
	  });

	// Попапы
	// $(".js-show-popup").on("click", function (e) {
	// 	e.preventDefault();
	// 	$(".modal").fadeOut();

	// 	$(".popup-overlay").fadeIn();
	// 	$($(this).attr("href")).fadeIn();
	// 	$($(this).attr("href")).css({ "max-height": $(window).height() });

	// 	$("body").addClass("lock");

	// 	if ($(this).hasClass("--video")) {
	// 		let srcVideo = $(this).attr("data-video-src");
	// 		let srcIframe = $($(this).attr("href")).find("iframe").attr("src");
	// 		if (!srcIframe.includes(srcVideo)) {
	// 			$($(this).attr("href"))
	// 				.find("iframe")
	// 				.attr("src", srcIframe + srcVideo);
	// 		}
	// 	}
	// });

	// $(".js-modal-close").on("click", function (e) {
	// 	$(this).parents(".modal").fadeOut();
	// 	$(".popup-overlay").fadeOut();
	// 	$("body").removeClass("lock");
	// });

	// $(".popup-overlay").on("click", function (e) {
	// 	$(".modal").fadeOut();
	// 	$(this).fadeOut();
	// 	$("body").removeClass("lock");
	// });

	$(".js-tab").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).attr("href");

		$(this).parent().find(".js-tab").removeClass("active");

		$(elementId).parent().find(".js-tab-item").removeClass("active");

		$(this).addClass("active");

		$(elementId).addClass("active");
		
	});
});

