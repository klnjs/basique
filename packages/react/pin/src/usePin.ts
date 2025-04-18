import { useRef, useState } from 'react'
import { useControllableState, usePrevious } from '@klnjs/react-core'
import { isRecord } from '@klnjs/assertion'
import type { PinType, PinConceal, PinDirection } from './PinTypes'

export type UsePinOptions = {
	conceal?: PinConceal
	defaultValue?: string
	disabled?: boolean
	length?: number
	type?: PinType
	value?: string
	onChange?: (value: string) => void
}

export const usePin = ({
	conceal: concealProp,
	defaultValue,
	disabled = false,
	length = 4,
	type = 'alphanumeric',
	value,
	onChange
}: UsePinOptions = {}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const [inputId, setInputId] = useState<string>()

	const [focusWithin, setFocusWithin] = useState(false)

	const [pin = '', setPin] = useControllableState({
		value,
		defaultValue,
		onChange
	})

	const pinBefore = usePrevious(pin)

	const conceal = {
		enabled: concealProp !== undefined,
		delay: isRecord(concealProp) ? concealProp.delay : 250,
		symbol: isRecord(concealProp)
			? concealProp.symbol
			: (concealProp ?? '·')
	}

	const direction: PinDirection =
		pinBefore === null || pinBefore.length < pin.length
			? 'forwards'
			: 'backwards'

	return {
		conceal,
		disabled,
		direction,
		focusWithin,
		inputId,
		inputRef,
		length,
		pin,
		type,
		setPin,
		setInputId,
		setFocusWithin
	}
}
