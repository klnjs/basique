import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'

export type PinGroupProps = CoreProps<'div'>

export const PinGroup = forwardRef<'div', PinGroupProps>(
	(props, forwardedRef) => <poly.div ref={forwardedRef} {...props} />
)
