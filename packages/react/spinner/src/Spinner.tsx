import { poly, forwardRef, type CoreProps } from '@klnjs/react-core'
import { SpinnerProvider } from './SpinnerContext'
import { useSpinner, type SpinnerOptions } from './useSpinner'

export type SpinnerProps = CoreProps<'svg', Partial<SpinnerOptions>>

export const Spinner = forwardRef<'svg', SpinnerProps>(
	({ size = 24, width = 4, ...otherProps }, forwardedRef) => {
		const spinner = useSpinner({
			size,
			width
		})

		return (
			<SpinnerProvider value={spinner}>
				<poly.svg
					ref={forwardedRef}
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${spinner.diameter} ${spinner.diameter}`}
					width={spinner.diameter}
					height={spinner.diameter}
					{...otherProps}
				/>
			</SpinnerProvider>
		)
	}
)
