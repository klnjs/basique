import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { mapObject } from '../theme/helpers.css'
import { paletteProperties } from '../theme/properties.css'
import { createTransition } from '../theme/transitions.css'

export const avatar = style({
	width: 50,
	height: 50,
	display: 'flex',
	transition: createTransition('color', 'background', 'border-radius'),
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative'
})

export const avatarProperties = defineProperties({
	properties: {
		variant: mapObject(
			{ round: 9999, rounded: 2, square: 0 } as const,
			(value) => ({
				borderRadius: value === 9999 ? '50%' : vars.spacing[value]
			})
		)
	}
})

export const avatarSprinkles = createSprinkles(
	avatarProperties,
	paletteProperties
)

export type AvatarSprinkles = Parameters<typeof avatarSprinkles>[0]

export const image = style({
	width: '100%',
	height: '100%',
	display: 'block',
	position: 'absolute',
	objectFit: 'cover'
})

export const fallback = style({})
