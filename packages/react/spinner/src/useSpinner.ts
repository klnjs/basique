import { createSpinner, type SpinnerOptions } from '@klnjs/spinner'

export const useSpinner = ({ size, width }: SpinnerOptions) =>
	createSpinner({ size, width })
