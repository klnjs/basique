import { useId, type CoreProps } from '@klnjs/react-core'
import { useIconContext } from './IconContext'

export type IconTitleProps = CoreProps<'title'>

export const IconTitle = ({ id: idProp, ...otherProps }: IconTitleProps) => {
	const { setLabelId } = useIconContext()
	const id = useId(idProp, setLabelId)

	return <title id={id} {...otherProps} />
}
