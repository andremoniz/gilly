export const getBackgroundColorOfElement = (element) => {
	const transparent = `rgba(0, 0, 0, 0)`;
	if (!element) return transparent;

	const bg = getComputedStyle(element).backgroundColor;
	if (bg === transparent) {
		return getBackgroundColorOfElement(element.parentElement);
	} else {
		return bg;
	}
};
