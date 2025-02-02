import type { PointerEvent } from "react";
import { poly, asDataProp, type CoreProps } from "@klnjs/react-core";
import { useCalendarFieldContext } from "./CalendarFieldContext";

export type CalendarFieldInputProps = CoreProps<"div">;

export const CalendarFieldInput = (props: CalendarFieldInputProps) => {
	const { disabled, highlightedSegmentRef } = useCalendarFieldContext();

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!disabled && event.target === event.currentTarget) {
			event.preventDefault();
			highlightedSegmentRef.current?.focus();
		}
	};

	return (
		<poly.div
			onPointerDown={handlePointerDown}
			data-disabled={asDataProp(disabled)}
			{...props}
		/>
	);
};
