import { poly, useId, type CoreProps } from '@klnjs/react-core'
import { usePopoverContext } from './PopoverContext'

export type PopoverHeadingProps = CoreProps<'h2'>

export const PopoverHeading = ({
	id: idProp,
	...otherProps
}: PopoverHeadingProps) => {
	const { setLabelId } = usePopoverContext()
	const id = useId(idProp, setLabelId)

	return <poly.h2 id={id} {...otherProps} />
}
