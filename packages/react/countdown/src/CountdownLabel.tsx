import { poly, forwardRef, useId, type CoreProps } from '@klnjs/react-core'
import { useCountdownContext } from './CountdownContext'

export type CountdownLabelProps = CoreProps<'label'>

export const CountdownLabel = forwardRef<'label', CountdownLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { setLabelId } = useCountdownContext()

		const id = useId(idProp, setLabelId)

		return <poly.label id={id} ref={forwardedRef} {...otherProps} />
	}
)
