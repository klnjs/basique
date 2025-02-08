import { poly, useId, type CoreProps } from '@klnjs/react-core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = CoreProps<'p'>

export const PopoverDescription = ({
	id: idProp,
	...otherProps
}: PopoverDescriptionProps) => {
	const { setDescriptionId } = usePopoverContext()
	const id = useId(idProp, setDescriptionId)

	return <poly.p id={id} {...otherProps} />
}
