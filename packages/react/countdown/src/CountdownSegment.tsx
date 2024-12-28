import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import type { CountdownUnit } from './useCountdownUnit'

export type CountdownSegmentProps = CoreProps<
	'div',
	{
		unit: CountdownUnit
	}
>

export const CountdownSegment = forwardRef<'div', CountdownSegmentProps>(
	({ unit, ...otherProps }, ref) => (
		<poly.div ref={ref} data-unit={unit} {...otherProps} />
	)
)
