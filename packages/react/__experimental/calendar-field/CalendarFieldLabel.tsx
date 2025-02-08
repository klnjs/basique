import { poly, useId, type CoreProps } from "@klnjs/react-core";
import { useCalendarFieldContext } from "./CalendarFieldContext";

export type CalendarFieldLabelProps = CoreProps<"label">;

export const CalendarFieldLabel = ({
	id: idProp,
	...otherProps
}: CalendarFieldLabelProps) => {
	const { highlightedSegmentRef, labelId, setLabelId } =
		useCalendarFieldContext();
	const id = useId(idProp, setLabelId);

	return (
		<poly.label
			id={labelId}
			onClick={() => highlightedSegmentRef.current?.focus()}
			{...otherProps}
		/>
	);
};
