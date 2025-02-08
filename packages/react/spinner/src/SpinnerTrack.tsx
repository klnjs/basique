import { poly, type CoreProps } from '@klnjs/react-core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerTrackProps = CoreProps<'circle'>

export const SpinnerTrack = (props: SpinnerTrackProps) => {
	const { radius, center, width } = useSpinnerContext()

	return (
		<poly.circle
			r={radius}
			cx={center}
			cy={center}
			fill="none"
			stroke="currentColor"
			strokeWidth={width}
			{...props}
		/>
	)
}
