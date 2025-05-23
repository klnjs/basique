import type {
	ChangeEvent,
	KeyboardEvent,
	ClipboardEvent,
	CSSProperties
} from 'react'
import {
	poly,
	useId,
	useMergeRefs,
	useChainHandler,
	type CoreProps
} from '@klnjs/react-core'
import { usePinContext } from './PinContext'
import { usePinPattern } from './usePinPattern'

export type PinInputProps = CoreProps<'input'>

export const PinInput = ({
	id: idProp,
	hidden = true,
	ref: refProp,
	autoComplete = 'one-time-code',
	style: styleProp,
	onBlur,
	onFocus,
	onPaste,
	onChange,
	onKeyDown,
	...otherProps
}: PinInputProps) => {
	const {
		pin,
		type,
		length,
		disabled,
		inputRef,
		setPin,
		setInputId,
		setFocusWithin
	} = usePinContext()

	const id = useId(idProp, setInputId)
	const refMerged = useMergeRefs(inputRef, refProp)

	const pattern = usePinPattern(type)
	const style: CSSProperties | undefined = hidden
		? {
				position: 'absolute',
				pointerEvents: 'none',
				opacity: 0,
				...styleProp
			}
		: styleProp

	const handleBlur = useChainHandler(onBlur, () => setFocusWithin(false))

	const handleFocus = useChainHandler(onFocus, () => setFocusWithin(true))

	const handlePaste = useChainHandler(onPaste, (event: ClipboardEvent) => {
		const input = event.clipboardData.getData('text/plain')
		const sanitized = input
			.split('')
			.filter((char) => pattern.test(char))
			.slice(0, length)
			.join('')

		setPin(sanitized)
	})

	const handleChange = useChainHandler(
		onChange,
		(event: ChangeEvent<HTMLInputElement>) => {
			if (pattern.test(event.target.value)) {
				setPin(event.target.value)
			}
		}
	)

	const handleKeyDown = useChainHandler(
		onKeyDown,
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (
				event.code === 'End' ||
				event.code === 'Home' ||
				event.code.startsWith('Arrow')
			) {
				event.preventDefault()
			}
		}
	)

	return (
		<poly.input
			id={id}
			ref={refMerged}
			type="text"
			value={pin}
			style={style}
			pattern={pattern.source}
			disabled={disabled}
			inputMode={type !== 'numeric' ? 'text' : type}
			maxLength={length}
			autoComplete={autoComplete}
			onBlur={handleBlur}
			onFocus={handleFocus}
			onPaste={handlePaste}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			{...otherProps}
		/>
	)
}
