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
	const parent = textarea.parentElement as Node

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

	const now = measureContentHeight(dummy, `${textarea.value}\n`)
	const min = measureContentHeight(dummy, `${Array(minRows).join('\n')}\n`)
	const max =
		maxRows !== Infinity
			? measureContentHeight(dummy, `${Array(maxRows).join('\n')}\n`)
			: Infinity

	parent.removeChild(dummy)

	return { now, min, max }
}

export const measureContentHeight = (element: HTMLElement, value: string) => {
	element.textContent = value

	return element.offsetHeight
}
