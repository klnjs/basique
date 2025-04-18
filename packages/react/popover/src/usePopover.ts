import { useState } from 'react'
import { useControllableState } from '@klnjs/react-core'
import {
	offset as offsetMiddleware,
	autoUpdate,
	useRole,
	useClick,
	useDismiss,
	useFloating,
	useInteractions
} from '@floating-ui/react'
import type {
	PopoverDismiss,
	PopoverDuration,
	PopoverPlacement
} from './PopoverTypes'
import { usePopoverStatus } from './usePopoverStatus'

export type UsePopoverOptions = {
	root?: string
	open?: boolean
	modal?: boolean
	offset?: number
	dismiss?: PopoverDismiss
	duration?: PopoverDuration
	placement?: PopoverPlacement
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

export const usePopover = ({
	root,
	open: openProp,
	modal,
	offset,
	dismiss,
	duration = 0,
	placement,
	defaultOpen,
	onOpenChange
}: UsePopoverOptions) => {
	const [labelId, setLabelId] = useState<string>()

	const [descriptionId, setDescriptionId] = useState<string>()

	const [open, setOpen] = useControllableState({
		value: openProp,
		defaultValue: defaultOpen,
		onChange: onOpenChange
	})

	const { refs, context, floatingStyles } = useFloating({
		open,
		placement,
		whileElementsMounted: autoUpdate,
		onOpenChange: setOpen,
		middleware: [offsetMiddleware(offset)]
	})

	const { mounted, status } = usePopoverStatus(context, duration)

	const { getFloatingProps, getReferenceProps } = useInteractions([
		useRole(context),
		useClick(context),
		useDismiss(context, {
			escapeKey: dismiss?.onEscapeKey,
			outsidePress: dismiss?.onPressOutside,
			ancestorScroll: dismiss?.onAncestorScroll
		})
	])

	return {
		root,
		refs,
		modal,
		status,
		mounted,
		dismiss,
		context,
		placement,
		floatingStyles,
		open,
		labelId,
		descriptionId,
		setOpen,
		setLabelId,
		setDescriptionId,
		getFloatingProps,
		getReferenceProps
	}
}
