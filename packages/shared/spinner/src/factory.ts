import type { Spinner, SpinnerOptions } from './types'

export const createSpinner = ({ size, width }: SpinnerOptions): Spinner => {
	const radius = size / 2 - width / 2
	const diameter = radius * 2 + width
	const center = diameter / 2
	const circumference = radius * Math.PI * 2

	return {
		width,
		center,
		radius,
		diameter,
		circumference
	}
}
