import {
	poly,
	useMergeRefs,
	type CoreProps,
	asDataProp
} from '@klnjs/react-core'
import { usePopoverContext } from './PopoverContext'

export type PopoverAnchorProps = CoreProps<'div'>

export const PopoverAnchor = ({
	ref: refProp,
	...otherProps
}: PopoverAnchorProps) => {
	const { refs, status } = usePopoverContext()
	const refMerged = useMergeRefs<HTMLDivElement>(
		refs.setPositionReference,
		refProp
	)

	return (
		<poly.div
			ref={refMerged}
			data-status={asDataProp(status)}
			{...otherProps}
		/>
	)
}
