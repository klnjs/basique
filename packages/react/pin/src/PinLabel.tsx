import { poly, type CoreProps } from '@klnjs/react-core'
import { usePinContext } from './PinContext'

export type PinLabelProps = CoreProps<'label'>

export const PinLabel = (props: PinLabelProps) => {
	const { inputId } = usePinContext()

	return <poly.label htmlFor={inputId} {...props} />
}
