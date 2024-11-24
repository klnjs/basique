import { useRef, useState, useEffect, useCallback } from 'react'
import { clamp } from '@klnjs/math'
import {
	poly,
	forwardRef,
	useSupports,
	useRefComposed,
	useChainHandler,
	type CoreProps
} from '@klnjs/react-core'
import { getTextareaMeasurements } from './useTextareaMeasure'

export type TextareaProps = CoreProps<
	'textarea',
	{
		value?: string
		defaultValue?: string
		autosize?: boolean
		rows?: never
		minRows?: number
		maxRows?: number
	}
>

export const Textarea = forwardRef<'textarea', TextareaProps>(
	(
		{
			autosize = false,
			minRows = 2,
			maxRows,
			style,
			value: valueProp,
			defaultValue,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)
		const textareaWidthRef = useRef<number>()
		const refComposed = useRefComposed(textareaRef, forwardedRef)

		const [height, setHeight] = useState<number>()

		const fieldSizing = 'content'
		const fieldSizingIsSupported = useSupports('field-sizing', fieldSizing)

		const sync = useCallback(() => {
			if (textareaRef.current !== null) {
				const { now, min, max } = getTextareaMeasurements(
					textareaRef.current,
					{ minRows, maxRows }
				)

				setHeight(clamp(now, min, max))
			}
		}, [minRows, maxRows])

		const handleChange = useChainHandler(onChange, sync)

		// @ts-expect-error intended no return
		useEffect(() => {
			if (autosize && !fieldSizingIsSupported && textareaRef.current) {
				const resize = new ResizeObserver((entries) => {
					if (entries[0]) {
						const prev = textareaWidthRef.current
						const next = entries[0].contentRect.width

						if (prev !== next) {
							textareaWidthRef.current = next
							window.requestAnimationFrame(sync)
						}
					}
				})

				resize.observe(textareaRef.current)

				return () => {
					resize.disconnect()
				}
			}
		}, [sync, autosize, fieldSizingIsSupported])

		return (
			<poly.textarea
				ref={refComposed}
				// @ts-expect-error field-sizing not standard yet
				style={{ height, fieldSizing, ...style }}
				onChange={handleChange}
				{...otherProps}
			/>
		)
	}
)
