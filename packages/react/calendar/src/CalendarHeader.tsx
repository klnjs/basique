import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'

export type CalendarHeaderProps = CoreProps<'header'>

export const CalendarHeader = forwardRef<'header', CalendarHeaderProps>(
	(props, forwardedRef) => <poly.header ref={forwardedRef} {...props} />
)
