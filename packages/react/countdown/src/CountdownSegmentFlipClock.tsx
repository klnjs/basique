import { usePrevious, type CoreProps } from '@klnjs/react-core'
import { useRef, useMemo, useEffect, type CSSProperties } from 'react'
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
			<div data-label="">{label}</div>
			<div data-clock="" style={styles.clock}>
				<div data-clock-upper="" style={styles.upper}>
					<span data-clock-text="">{value}</span>
				</div>

				<div data-clock-lower="" style={styles.lower}>
					<span data-clock-text="">{cache ?? value}</span>
				</div>
				<div style={styles.realm}>
					<div ref={ref} style={styles.twirl}>
						<div data-clock-upper="" style={styles.upper}>
							<span data-clock-text="">{cache ?? value}</span>
						</div>
						<div data-clock-lower="" style={styles.verso}>
							<span data-clock-text="">{value}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const useFlipClockStyles = (perspective: number) =>
	useMemo(() => {
		const clock: CSSProperties = { position: 'relative' }

		const front: CSSProperties = {
			position: 'absolute',
			inset: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backfaceVisibility: 'hidden'
		}

		const upper: CSSProperties = { ...front, clipPath: 'inset(0 0 50% 0)' }

		const lower: CSSProperties = { ...front, clipPath: 'inset(50% 0 0 0)' }

		const twirl: CSSProperties = {
			...front,
			transformStyle: 'preserve-3d',
			willChange: 'transform'
		}

		const realm: CSSProperties = {
			pointerEvents: 'none',
			position: 'absolute',
			perspective,
			perspectiveOrigin: '50% 50%',
			inset: 0
		}

		const verso: CSSProperties = { ...lower, transform: 'rotateX(180deg)' }

		return {
			clock,
			upper,
			lower,
			twirl,
			realm,
			verso
		}
	}, [perspective])
