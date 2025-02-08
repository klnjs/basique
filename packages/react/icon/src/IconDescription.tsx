import { useId, type CoreProps } from '@klnjs/react-core'
import { useIconContext } from './IconContext'

export type IconDescriptionProps = CoreProps<'desc'>

export const IconDescription = ({
	id: idProp,
	...otherProps
}: IconDescriptionProps) => {
	const { setDescriptionId } = useIconContext()
	const id = useId(idProp, setDescriptionId)

	return <desc id={id} {...otherProps} />
}
