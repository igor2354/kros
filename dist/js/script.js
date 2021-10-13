document.addEventListener(
	"DOMContentLoaded",
	function () {
		let swiper_portfolio = new Swiper(".portfolio-slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,

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

		let swiper_tenants_breakpoint;

		let swiper_tenants = new Swiper(".tenants-slider", {
			// Optional parameters
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,

			on: {
				resize: function () {
					this.slides.forEach((element) => {
						element.style.height = element.clientWidth + "px";
					});
				},

				afterInit: function () {
					this.slides.forEach((element) => {
						element.style.height = element.clientWidth + "px";
					});

					this.slides.forEach((element) => {
						element.style.zIndex = "1";
					});

					this.el.style.borderRadius = this.slides[0].clientWidth + "px";

					this.slides[this.activeIndex - 1] ? (this.slides[this.activeIndex - 1].style.zIndex = "0") : null;

					this.slides[this.activeIndex + swiper_tenants_breakpoint] ? (this.slides[this.activeIndex + swiper_tenants_breakpoint].style.zIndex = "-1") : null;
				},

				slideChange: function () {
					this.slides.forEach((element) => {
						element.style.zIndex = "1";
					});

					this.slides[this.activeIndex - 1] ? (this.slides[this.activeIndex - 1].style.zIndex = "0") : null;

					this.slides[this.activeIndex + swiper_tenants_breakpoint] ? (this.slides[this.activeIndex + swiper_tenants_breakpoint].style.zIndex = "-1") : null;
				},

				breakpoint: function (swiper, breakpointParams) {
					this.slides.forEach((element) => {
						element.style.zIndex = "1";
					});

					swiper_tenants_breakpoint = breakpointParams.slidesPerView ? breakpointParams.slidesPerView : 6;
					this.slides[this.activeIndex - 1] ? (this.slides[this.activeIndex - 1].style.zIndex = "0") : null;

					this.slides[this.activeIndex + swiper_tenants_breakpoint] ? (this.slides[this.activeIndex + swiper_tenants_breakpoint].style.zIndex = "-1") : null;
				},
			},

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

			// If we need pagination
			pagination: {
				el: ".slider-pagination",
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
		});

		let sliderTeam = Array.prototype.slice.call(document.querySelectorAll(".js-slider-team"));

		if (sliderTeam.length > 0) {
			sliderTeam.forEach((element) => {
				let swiper_team = new Swiper(element.querySelector(".team__container"), {
					// Optional parameters
					slidesPerView: 1,
					spaceBetween: 20,
					loop: true,
					loopedSlides: 4,

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

						900: {
							spaceBetween: 120,
							slidesPerView: 2,
						},
					},
				});

				let team_slider_center = new Swiper(element.querySelector(".slider-center"), {
					slidesPerView: 1,
					spaceBetween: 20,
					loop: true,
					loopedSlides: 4,
					fadeEffect: { crossFade: true },
					virtualTranslate: true,
					effect: "fade",

					controller: {
						control: swiper_team,
					},

					on: {
						afterInit: function () {
							swiper_team.controller.control = this;
						},
					},
				});
			});
		}
	},
	false
);

$(document).ready(function () {
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

	// Открытие поиска
	$(".js-search").on("click", function () {
		$("body").toggleClass("lock");
		$(".search-panel").toggleClass("active");
	});

	$(".search-panel__close").on("click", function () {
		$("body").removeClass("lock");
		$(".search-panel").removeClass("active");
	});

	let match = [window.matchMedia("(max-width: 1170px)")];

	// Расставляем точки на карте
	$.each($(".our-offices__item"), function (index, val) {
		let coordinatesTop = $(val).attr("data-coordinates-top");
		let coordinatesLeft = $(val).attr("data-coordinates-left");

		$(val).css({ top: coordinatesTop, left: coordinatesLeft });
	});

	$.each($(".our-offices__info"), function (index, val) {
		if ($(window).width() < $(val).offset().left + $(val).innerWidth()) {
			$(val).addClass("--right");
		}
	});

	$(window).on("resize", function () {
		$.each($(".our-offices__info"), function (index, val) {
			if ($(window).width() < $(val).offset().left + $(val).innerWidth()) {
				$(val).addClass("--right");
			}
		});
	});

	$(".close-map").on("click", function () {
		$(this).parents(".our-offices__item").removeClass("active");
		$(this).parents(".our-offices__info").removeClass("active");
	});

	$(".our-offices__icon-marker").on("click", function () {
		$(".our-offices__item").removeClass("active");
		$(".our-offices__info").removeClass("active");

		$(this).parents(".our-offices__item").addClass("active");

		$(`.our-offices__info[data-city=${$(this).parents(".our-offices__item").attr("data-city")}]`).addClass("active");
	});

	function moveMapHint() {
		if (match[0].matches) {
			$.each($(".our-offices__info"), function (index, val) {
				$(".container-section__list").append($(val));
			});

			$(".our-offices__icon-marker").eq(0).click();
		} else {
			$.each($(".our-offices__info"), function (index, val) {
				let dataCity = $(val).attr("data-city");

				$(`.our-offices__item[data-city=${dataCity}]`).append($(val));
			});
		}
	}

	moveMapHint();
	match[0].addListener(moveMapHint);

	$(window).scroll(function (e) {
		if ($(this).scrollTop() > 0) {
			$("#scroller").fadeIn();
		} else {
			$("#scroller").fadeOut();
		}
	});

	$("#scroller").click(function (e) {
		e.preventDefault();
		$("body,html").animate({ scrollTop: 0 }, 400);
	});

	// Скрипт табов
	$(".js-tab").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).attr("href");

		$(this).parents(".js-tab-container").find(".js-tab").removeClass("active");

		$(this).addClass("active");

		new Promise((resolve, reject) => {
			$(elementId).parents(".js-tab-container").find(".js-tab-item").removeClass("active");
			setTimeout(() => {
				$(elementId).parents(".js-tab-container").find(".js-tab-item").css({ display: "none" });
				resolve();
			}, 200);
		}).then(() => {
			setTimeout(() => {
				$(elementId).addClass("active");
			}, 100);

			$(elementId).css({ display: "block" });
		});
	});

	$(".js-tab").eq(0).click();

	// ПЛАВНЫЙ ЯКОРЬ
	$(".js-anchor").click(function () {
		let target = $(this).attr("href");
		$("html, body").animate(
			{
				scrollTop: $(target).offset().top - 150,
			},
			800
		);
		return false;
	});

	$(".lightgallery").lightGallery({
		selector: "a",
	});
});

//Попапы
$(".js-show-popup").on("click", function (e) {
	e.preventDefault();
	$(".modal").fadeOut();

	$(".popup-overlay").fadeIn();
	$($(this).attr("href")).fadeIn();
	$($(this).attr("href")).css({ "max-height": $(window).height() });

	$("body").addClass("lock");

	if ($(this).hasClass("--video")) {
		let srcVideo = $(this).attr("data-video-src");
		let srcIframe = $($(this).attr("href")).find("iframe").attr("src");
		if (!srcIframe.includes(srcVideo)) {
			$($(this).attr("href"))
				.find("iframe")
				.attr("src", srcIframe + srcVideo);
		}
	}
});

$(".js-modal-close").on("click", function (e) {
	$(this).parents(".modal").fadeOut();
	$(".popup-overlay").fadeOut();
	$("body").removeClass("lock");
});

$(".popup-overlay").on("click", function (e) {
	$(".modal").fadeOut();
	$(this).fadeOut();
	$("body").removeClass("lock");
});
