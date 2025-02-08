import {
	asDataProp,
	useChainHandler,
	useDataProps,
	type CoreProps
} from '@klnjs/react-core'
import { usePinContext } from './PinContext'
import { usePinConceal } from './usePinConceal'

export type PinSlotProps = CoreProps<
	'div',
	{
		slot: number
		placeholder?: string
	}
>

export const PinSlot = ({
	slot,
	placeholder,
	onPointerDown,
	...otherProps
}: PinSlotProps) => {
	const {
		pin,
		length,
		conceal: { delay, symbol, enabled },
		inputRef,
		disabled = false,
		direction,
		focusWithin: isFocusWithin
	} = usePinContext()

	const value = pin[slot - 1] ?? ''
	const content = usePinConceal({
		enabled,
		delay,
		value,
		symbol,
		direction,
		placeholder
	})

	const isEnd = slot === length
	const isStart = slot === 1
	const isActive = slot === Math.min(length, pin.length + 1)
	const isFocused = isFocusWithin && isActive
	const isDisabled = disabled
	const isConcealed = content === symbol
	const isPlaceholder = content === placeholder && placeholder !== ''
	const isCaret = isFocused && pin.length < length

	const handlePointerDown = useChainHandler(onPointerDown, (event) => {
		event.preventDefault()
		inputRef.current?.focus()
	})

	return (
		<div
			data-end={asDataProp(isEnd)}
			data-start={asDataProp(isStart)}
			data-caret={asDataProp(isCaret)}
			data-focused={asDataProp(isFocused)}
			data-disabled={asDataProp(isDisabled)}
			data-concealed={asDataProp(isConcealed)}
			data-placeholder={asDataProp(isPlaceholder)}
			onPointerDown={handlePointerDown}
			{...otherProps}
			{...useDataProps({})}
		>
			{content}
		</div>
	)
}
