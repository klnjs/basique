import { poly, chain, type CoreProps } from "../../packages/core/dist";
import {
	usePopover,
	PopoverProvider,
	type UsePopoverOptions,
} from "../../packages/popover/dist";
import { CalendarFieldProvider } from "./CalendarFieldContext";
import {
	useCalendarField,
	type UseCalendarFieldOptions,
} from "./useCalendarField";

export type CalendarFieldProps = CoreProps<
	"div",
	UseCalendarFieldOptions & Pick<UsePopoverOptions, "onOpenChange">
>;

export const CalendarField = ({
	autoFocus,
	min,
	max,
	value,
	locale,
	disabled,
	defaultValue,
	onChange,
	onOpenChange,
	...otherProps
}: CalendarFieldProps) => {
	const field = useCalendarField({
		autoFocus,
		min,
		max,
		value,
		locale,
		disabled,
		defaultValue,
		onChange: chain(() => field.setOpen(false), onChange),
	});

	const popover = usePopover({
		open: field.open,
		onOpenChange: chain(field.setOpen, onOpenChange),
	});

	return (
		<CalendarFieldProvider value={field}>
			<PopoverProvider value={popover}>
				<poly.div role="group" {...otherProps} />
			</PopoverProvider>
		</CalendarFieldProvider>
	);
};
