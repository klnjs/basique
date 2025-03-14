import { poly, type CoreProps } from '@klnjs/react-core'
import {
	useTemporal,
	type UseTemporalOptions,
	type TemporalType
} from './useTemporal'
import { TemporalProvider } from './TemporalContext'

export type TemporalProps<T extends TemporalType> = CoreProps<
	'div',
	UseTemporalOptions<T>
>

export const Temporal = <T extends TemporalType>({
	autoFocus,
	type,
	min,
	max,
	value,
	locale,
	disabled,
	defaultValue,
	onChange,
	...otherProps
}: TemporalProps<T>) => {
	const temporal = useTemporal({
		autoFocus,
		type,
		min,
		max,
		value,
		locale,
		disabled,
		defaultValue,
		onChange
	})

	return (
		// @ts-expect-error T is not assignable to
		<TemporalProvider value={temporal}>
			<poly.div {...otherProps} />
		</TemporalProvider>
	)
}
