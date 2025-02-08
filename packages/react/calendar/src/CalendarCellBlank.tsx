import { poly, type CoreProps } from '@klnjs/react-core'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellBlankProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellBlank = ({
	type,
	date,
	children,
	...otherProps
}: CalendarCellBlankProps) => (
	<poly.div data-cell="blank" {...otherProps}>
		{children}
	</poly.div>
)
