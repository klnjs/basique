export const isElementRTL = (element: HTMLElement) => {
	if (typeof window === 'undefined') {
		return false
	}

	return (
		window.getComputedStyle(element).getPropertyValue('direction') === 'rtl'
	)
}
