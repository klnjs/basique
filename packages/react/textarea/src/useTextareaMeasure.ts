export type TextareaMeasurementsOptions = {
	minRows?: number
	maxRows?: number
}

export const getTextareaMeasurements = (
	textarea: HTMLTextAreaElement,
	{ minRows = 1, maxRows = Infinity }: TextareaMeasurementsOptions
) => {
	const dummy = document.createElement('div')
	const styles = window.getComputedStyle(textarea)
	const parent = textarea.parentElement

	if (!parent) {
		throw new Error(
			'The textarea element must be attached to the DOM and have a parent element.'
		)
	}

	parent.appendChild(dummy)

	dummy.style.font = styles.font
	dummy.style.width = styles.width
	dummy.style.border = styles.border
	dummy.style.padding = styles.padding
	dummy.style.position = 'absolute'
	dummy.style.visibility = 'hidden'
	dummy.style.boxSizing = styles.boxSizing
	dummy.style.wordBreak = styles.wordBreak
	dummy.style.wordSpacing = styles.wordSpacing
	dummy.style.overflowWrap = styles.overflowWrap
	dummy.style.whiteSpace = styles.whiteSpace

	const nowHeight = measureContentHeight(dummy, `${textarea.value}\n`)
	const minHeight = measureContentHeight(
		dummy,
		`${Array(minRows).join('\n')}\n`
	)
	const maxHeight =
		maxRows !== Infinity
			? measureContentHeight(dummy, `${Array(maxRows).join('\n')}\n`)
			: Infinity

	parent.removeChild(dummy)

	return {
		now: nowHeight,
		min: minHeight,
		max: maxHeight
	}
}

export const measureContentHeight = (element: HTMLElement, value: string) => {
	element.textContent = value

	return element.offsetHeight
}
