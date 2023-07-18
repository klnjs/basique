import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = AsChildComponentProps<'label'>

export const CalendarFieldLabel = forwardRef<'label', CalendarFieldLabelProps>(
	(props, forwardedRef) => {
		const { labelId } = useCalendarFieldContext()

		return <freya.label id={labelId} ref={forwardedRef} {...props} />
	}
)
