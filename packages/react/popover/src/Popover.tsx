import type { ReactNode } from 'react'
import { PopoverProvider } from './PopoverContext'
import { usePopover, type UsePopoverOptions } from './usePopover'

export type PopoverProps = UsePopoverOptions & { children: ReactNode }

export const Popover = ({
	root,
	open,
	modal,
	offset,
	dismiss,
	duration,
	placement,
	children,
	defaultOpen,
	onOpenChange
}: PopoverProps) => {
	const popover = usePopover({
		root,
		open,
		modal,
		offset,
		dismiss,
		duration,
		placement,
		defaultOpen,
		onOpenChange
	})

	return <PopoverProvider value={popover}>{children}</PopoverProvider>
}
