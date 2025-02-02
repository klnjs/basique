import { poly, type CoreProps } from '@klnjs/react-core'

export type CalendarHeaderProps = CoreProps<'header'>

export const CalendarHeader = (props: CalendarHeaderProps) => (
	<poly.header {...props} />
)
