export type Spinner = {
	width: number
	center: number
	radius: number
	diameter: number
	circumference: number
}

export type SpinnerOptions = { size: number; width: number }

export const useSpinner = ({ size, width }: SpinnerOptions) =>
	createSpinner({ size, width })

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
