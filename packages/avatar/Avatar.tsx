import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { AvatarProvider } from './AvatarContext'
import { useAvatar, type UseAvatarOptions } from './useAvatar'

export type AvatarProps = AsChildComponentProps<'div', UseAvatarOptions>

export const Avatar = forwardRef<'div', AvatarProps>(
	({ onLoad, onError, ...otherProps }, forwardedRef) => {
		const avatar = useAvatar({ onLoad, onError })
		const mergedProps = mergeProps(otherProps, avatar.rootProps)

		return (
			<AvatarProvider value={avatar}>
				<freya.div ref={forwardedRef} {...mergedProps} />
			</AvatarProvider>
		)
	}
)