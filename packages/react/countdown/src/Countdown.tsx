import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { CountdownProvider } from './CountdownContext'
import { useCountdown, type UseCountdownOptions } from './useCountdown'

export type CountdownProps = CoreProps<'div', UseCountdownOptions>

export const Countdown = forwardRef<'div', CountdownProps>(
	(
		{
			locale,
			until,
			largestUnit,
			smallestUnit,
			onStatusChange,
			...otherProps
		},
		forwardedRef
	) => {
		const countdown = useCountdown({
			locale,
			until,
			largestUnit,
			smallestUnit,
			onStatusChange
		})

		return (
			<CountdownProvider value={countdown}>
				<poly.div
					ref={forwardedRef}
					data-status={countdown.status}
					{...otherProps}
				/>
			</CountdownProvider>
		)
	}
)
