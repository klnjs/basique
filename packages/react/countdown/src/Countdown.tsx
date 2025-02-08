import { poly, type CoreProps } from '@klnjs/react-core'
import { CountdownProvider } from './CountdownContext'
import { useCountdown, type UseCountdownOptions } from './useCountdown'

export type CountdownProps = CoreProps<'div', UseCountdownOptions>

export const Countdown = ({
	locale,
	until,
	largestUnit,
	smallestUnit,
	onStatusChange,
	...otherProps
}: CountdownProps) => {
	const countdown = useCountdown({
		locale,
		until,
		largestUnit,
		smallestUnit,
		onStatusChange
	})

	return (
		<CountdownProvider value={countdown}>
			<poly.div data-status={countdown.status} {...otherProps} />
		</CountdownProvider>
	)
}
