import { poly, type CoreProps } from '@klnjs/react-core'

export type TemporalLiteralProps = CoreProps<'span'>

export const TemporalLiteral = (props: TemporalLiteralProps) => (
	<poly.span role="presentation" aria-hidden {...props} />
)
