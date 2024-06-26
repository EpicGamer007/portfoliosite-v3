// Loading
const loader = document.querySelector(".loader");
loader.addEventListener("transitionend", () => {
	loader.style.display = "none";
});
window.addEventListener("pageshow", () => {
	loader.style.opacity = "0";
});
window.addEventListener("beforeunload", () => {
	loader.style.opacity = "1";
	loader.style.display = "flex";
});

// Toggle Top Nav
const toggleMenu = () => {
	document.querySelector(".menu").classList.toggle("active");
	document.querySelector(".hamburger").setAttribute("aria-pressed", document.querySelector(".hamburger").getAttribute("aria-pressed") == "false" ? "true" : "false");
	Array.from(document.querySelectorAll(".menu a")).forEach((link) => {
		link.tabIndex = link.tabIndex == "-1" ? "0" : "-1";
	});
	Array.from(document.querySelectorAll(".pronounciation")).forEach((p) => {
		p.tabIndex = p.tabIndex == "-1" ? "0" : "-1";
	});
}
Array.from(document.querySelectorAll(".hamburger")).forEach((ham) => {
	ham.addEventListener("click", toggleMenu);
	ham.addEventListener("keydown", (e) => {
		if (e.keyCode === 32) return e.preventDefault();
		if (e.keyCode === 13) {
			e.preventDefault();
			toggleMenu();
		}
	});
	ham.addEventListener("keyup", (e) => {
		if (e.keyCode === 32) {
			e.preventDefault();
			toggleMenu();
		}
	});
});
Array.from(document.querySelectorAll(".menu > ul > li > a")).forEach((link) => {
	link.addEventListener("click", (e) => {
		document.querySelector(".menu").classList.toggle("active");
		loader.style.opacity = "1";
	});
});
Array.from(document.querySelectorAll(".bot-nav > a")).forEach((link) => {
	link.addEventListener("click", (e) => {
		if(document.querySelector(".menu").classList.contains("active")) {
			document.querySelector(".menu").classList.toggle("active");
			loader.style.opacity = "1";
		}
	});
});

if(window.innerHeight < document.body.scrollHeight && navigator.maxTouchPoints <= 0) {
	document.querySelector(".scroll-down").style.display = "block";
}