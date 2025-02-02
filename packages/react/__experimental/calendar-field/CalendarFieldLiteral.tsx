import { poly, type CoreProps } from "@klnjs/react-core";

export type CalendarFieldLiteralProps = CoreProps<"span">;

export const CalendarFieldLiteral = (props: CalendarFieldLiteralProps) => (
	<poly.span role="presentation" aria-hidden {...props} />
);
