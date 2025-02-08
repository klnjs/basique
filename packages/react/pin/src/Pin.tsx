import { poly, type CoreProps } from '@klnjs/react-core'
import { PinProvider } from './PinContext'
import { usePin, type UsePinOptions } from './usePin'

export type PinProps = CoreProps<'div', UsePinOptions>

export const Pin = ({
	defaultValue,
	disabled,
	length,
	conceal,
	type,
	value,
	onChange,
	...otherProps
}: PinProps) => {
	const pin = usePin({
		defaultValue,
		disabled,
		length,
		conceal,
		type,
		value,
		onChange
	})

	return (
		<PinProvider value={pin}>
			<poly.div {...otherProps} />
		</PinProvider>
	)
}
