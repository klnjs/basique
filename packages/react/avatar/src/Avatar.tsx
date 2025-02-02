import { poly, type CoreProps } from '@klnjs/react-core'
import { AvatarProvider } from './AvatarContext'
import { useAvatar, type UseAvatarOptions } from './useAvatar'

export type AvatarProps = CoreProps<'div', UseAvatarOptions>

export const Avatar = ({ onStatusChange, ...otherProps }: AvatarProps) => {
	const avatar = useAvatar({ onStatusChange })

	return (
		<AvatarProvider value={avatar}>
			<poly.div {...otherProps} />
		</AvatarProvider>
	)
}
