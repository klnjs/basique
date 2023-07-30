import type { Meta } from '@storybook/react'
import { Icon as IconRoot } from './Icon'
import { IconTitle } from './IconTitle'
import { IconDescription } from './IconDescription'
import { IconPath } from './IconPath'

export default {
	title: 'Icon',
	component: IconRoot
} satisfies Meta<typeof Icon>

export const Icon = () => (
	<IconRoot viewBox="0 0 24 24">
		<IconTitle>Abacus</IconTitle>
		<IconDescription>Abacus icon</IconDescription>
		<IconPath d="M5 5H7V11H5V5M10 5H8V11H10V5M5 19H7V13H5V19M10 13H8V19H10V17H15V15H10V13M2 21H4V3H2V21M20 3V7H13V5H11V11H13V9H20V15H18V13H16V19H18V17H20V21H22V3H20Z" />
	</IconRoot>
)
