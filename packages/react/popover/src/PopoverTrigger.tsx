import {
	poly,
	asDataProp,
	useMergeRefs,
	type CoreProps
} from '@klnjs/react-core'
import { usePopoverContext } from './PopoverContext'

export type PopoverTriggerProps = CoreProps<'button'>

export const PopoverTrigger = ({
	ref: refProp,
	...otherProps
}: PopoverTriggerProps) => {
	const { open, refs, status, getReferenceProps } = usePopoverContext()
	const refMerged = useMergeRefs(refs.setReference, refProp)

	return (
		<poly.button
			ref={refMerged}
			type="button"
			data-open={asDataProp(open)}
			data-status={asDataProp(status)}
			{...getReferenceProps(otherProps)}
		/>
	)
}
