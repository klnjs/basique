import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import {
	poly,
	asDataProp,
	useMergeRefs,
	type CoreProps
} from '@klnjs/react-core'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = CoreProps<'div'>

export const PopoverContent = ({
	style,
	ref: refProp,
	...otherProps
}: PopoverContentProps) => {
	const {
		root,
		refs,
		modal = false,
		status,
		dismiss,
		mounted,
		placement,
		context,
		labelId,
		descriptionId,
		getFloatingProps
	} = usePopoverContext()

	const refMerged = useMergeRefs(refs.setFloating, refProp)
	const closeOnFocusOut = dismiss?.onFocusOut

	if (!mounted) {
		return null
	}

	return (
		<FloatingPortal id={root}>
			<FloatingFocusManager
				modal={modal}
				guards={!modal}
				context={context}
				closeOnFocusOut={closeOnFocusOut}
				visuallyHiddenDismiss={modal}
			>
				<poly.div
					ref={refMerged}
					style={{ ...context.floatingStyles, ...style }}
					aria-labelledby={labelId}
					aria-describedby={descriptionId}
					data-status={asDataProp(status)}
					data-placement={asDataProp(placement)}
					{...getFloatingProps(otherProps)}
				/>
			</FloatingFocusManager>
		</FloatingPortal>
	)
}
