import {
	useRef,
	useState,
	useEffect,
	useCallback,
	type ChangeEvent
} from 'react'
import { clamp } from '@klnjs/math'
import {
	poly,
	useSupports,
	useMergeRefs,
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
		onChange?: (value: string) => void
	}
>

export const Textarea = ({
	autosize = false,
	minRows = 2,
	maxRows,
	style,
	ref: refProp,
	value: valueProp,
	defaultValue,
	onChange,
	...otherProps
}: TextareaProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const textareaWidthRef = useRef<number>(0)
	const refMerged = useMergeRefs(textareaRef, refProp)

	const [height, setHeight] = useState<number>()

	const fieldSizing = 'content'
	const fieldSizingSupport = useSupports('field-sizing', fieldSizing)
	const fieldSizingFallback = autosize && !fieldSizingSupport

	const sync = useCallback(() => {
		if (fieldSizingFallback && textareaRef.current !== null) {
			const { now, min, max } = getTextareaMeasurements(
				textareaRef.current,
				{ minRows, maxRows }
			)

			setHeight(clamp(now, min, max))
		}
	}, [minRows, maxRows, fieldSizingFallback])

	const handleChange = useChainHandler(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			if (onChange) {
				onChange(event.target.value)
			}
		},
		sync
	)

	// @ts-expect-error intended no return
	useEffect(() => {
		if (fieldSizingFallback && textareaRef.current !== null) {
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
	}, [sync, fieldSizingFallback])

	return (
		<poly.textarea
			ref={refMerged}
			rows={minRows}
			// @ts-expect-error field-sizing not standard yet
			style={{ height, fieldSizing, ...style }}
			onChange={handleChange}
			{...otherProps}
		/>
	)
}
