import { usePrevious, type CoreProps } from '@klnjs/react-core'
import { useRef, useEffect, type CSSProperties, useMemo } from 'react'
import type { CountdownUnit } from './useCountdownUnit'

export type CountdownSegmentFlipProps = CoreProps<
	'div',
	{
		unit: CountdownUnit
		value: string
		label?: string
		duration?: number
		perspective?: number
	}
>

export const CountdownSegmentFlipClock = ({
	unit,
	value,
	label,
	duration = 1000,
	perspective = 200,
	...otherProps
}: CountdownSegmentFlipProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const cache = usePrevious(value)
	const styles = useFlipClockStyles(perspective)

	useEffect(() => {
		if (ref.current !== null && cache !== null && cache !== value) {
			ref.current.animate(
				[
					{ transform: 'rotateX(0deg)' },
					{ transform: 'rotateX(-180deg)' }
				],
				{ duration, fill: 'forwards', easing: 'ease-in-out' }
			)
		}
	}, [value, cache, duration])

	return (
		<div data-unit={unit} {...otherProps}>
			<div data-label>{label}</div>
			<div data-clock style={styles.clock}>
				<div data-clock-upper style={styles.upper}>
					<span data-clock-text>{value}</span>
				</div>

				<div data-clock-lower style={styles.lower}>
					<span data-clock-text>{cache ?? value}</span>
				</div>
				<div style={styles.plane}>
					<div ref={ref} style={styles.space}>
						<div data-clock-upper style={styles.upper}>
							<span data-clock-text>{cache ?? value}</span>
						</div>
						<div data-clock-lower style={styles.back}>
							<span data-clock-text>{value}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const useFlipClockStyles = (perspective: number) =>
	useMemo(() => {
		const face: CSSProperties = {
			position: 'absolute',
			inset: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backfaceVisibility: 'hidden',
			willChange: 'transform',
			transform: 'rotateX(0.1deg)'
		}

		const clock: CSSProperties = { position: 'relative' }

		const upper: CSSProperties = { ...face, clipPath: 'inset(0 0 50% 0)' }

		const lower: CSSProperties = { ...face, clipPath: 'inset(50% 0 0 0)' }

		const space: CSSProperties = { ...face, transformStyle: 'preserve-3d' }

		const plane: CSSProperties = {
			pointerEvents: 'none',
			position: 'absolute',
			perspective,
			perspectiveOrigin: '50% 50%',
			inset: 0
		}

		const back: CSSProperties = { ...lower, transform: 'rotateX(180deg)' }

		return {
			clock,
			upper,
			lower,
			space,
			plane,
			back
		}
	}, [perspective])
