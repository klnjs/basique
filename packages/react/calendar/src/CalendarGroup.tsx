import { poly, type CoreProps } from '@klnjs/react-core'

export type CalendarGroupProps = CoreProps<'div'>

export const CalendarGroup = (props: CalendarGroupProps) => (
	<poly.div {...props} />
)
