import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'

export type CountdownGroupProps = CoreProps<'div'>

export const CountdownGroup = forwardRef<'div', CountdownGroupProps>(
	(props, forwardedRef) => (
		<poly.div ref={forwardedRef} aria-hidden {...props} />
	)
)
