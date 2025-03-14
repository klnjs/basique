import { poly, asDataProp, type CoreProps } from '@klnjs/react-core'
import { useTemporalContext } from './TemporalContext'

export type TemporalGroupProps = CoreProps<'div'>

export const TemporalGroup = (props: TemporalGroupProps) => {
	const { disabled } = useTemporalContext()

	return <poly.div data-disabled={asDataProp(disabled)} {...props} />
}
