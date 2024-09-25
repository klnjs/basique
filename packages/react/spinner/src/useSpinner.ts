import { useMemo } from 'react'
import { createSpinner, type SpinnerOptions } from '@klnjs/spinner'

export const useSpinner = ({ size, width }: SpinnerOptions) =>
	useMemo(() => createSpinner({ size, width }), [size, width])
