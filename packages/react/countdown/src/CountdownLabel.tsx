import { poly, useId, type CoreProps } from '@klnjs/react-core'
import { useCountdownContext } from './CountdownContext'

export type CountdownLabelProps = CoreProps<'label'>

export const CountdownLabel = ({
	id: idProp,
	...otherProps
}: CountdownLabelProps) => {
	const { setLabelId } = useCountdownContext()

	const id = useId(idProp, setLabelId)

	return <poly.label id={id} {...otherProps} />
}
