import { poly, type CoreProps } from '@klnjs/react-core'
import type { CountdownUnit } from './useCountdownUnit'

export type CountdownSegmentProps = CoreProps<
	'div',
	{
		unit: CountdownUnit
	}
>

export const CountdownSegment = ({
	unit,
	...otherProps
}: CountdownSegmentProps) => <poly.div data-unit={unit} {...otherProps} />
