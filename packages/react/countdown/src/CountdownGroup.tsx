import { poly, type CoreProps } from '@klnjs/react-core'

export type CountdownGroupProps = CoreProps<'div'>

export const CountdownGroup = (props: CountdownGroupProps) => (
	<poly.div aria-hidden {...props} />
)
