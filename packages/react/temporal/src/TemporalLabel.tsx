import { poly, useId, type CoreProps } from '@klnjs/react-core'
import { useTemporalContext } from './TemporalContext'

export type TemporalLabelProps = CoreProps<'label'>

export const TemporalLabel = ({
	id: idProp,
	...otherProps
}: TemporalLabelProps) => {
	const { highlightedRef, setLabelId } = useTemporalContext()
	const id = useId(idProp, setLabelId)

	return (
		<poly.label
			id={id}
			onClick={() => highlightedRef.current?.focus()}
			{...otherProps}
		/>
	)
}
