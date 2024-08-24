import type { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@klnjs/react-popover'
import classes from './Reference.module.css'

export type ReferenceInfoProps = {
	children: ReactNode
}

export const ReferenceInfo = ({ children }: ReferenceInfoProps) => (
	<Popover offset={5}>
		<PopoverTrigger className={classes.trigger}>{'>'}</PopoverTrigger>
		<PopoverContent className={classes.content}>{children}</PopoverContent>
	</Popover>
)
