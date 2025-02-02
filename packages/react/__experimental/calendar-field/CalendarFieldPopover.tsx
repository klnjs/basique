import { PopoverContent, type PopoverContentProps } from "../../popover";

export type CalendarFieldPopoverProps = PopoverContentProps;

export const CalendarFieldPopover = ({
	placement = "bottom-start",
	...otherProps
}: CalendarFieldPopoverProps) => (
	<PopoverContent placement={placement} {...otherProps} />
);
