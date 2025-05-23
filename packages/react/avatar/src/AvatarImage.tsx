import { poly, useChainHandler, type CoreProps } from '@klnjs/react-core'
import { useAvatarContext } from './AvatarContext'

export type AvatarImageProps = CoreProps<'img'>

export const AvatarImage = ({
	src,
	style: styleProp,
	onLoad,
	onLoadStart,
	onError,
	...otherProps
}: AvatarImageProps) => {
	const { status, setStatus } = useAvatarContext()

	const style = {
		display: status !== 'loaded' ? 'none' : undefined,
		...styleProp
	}

	const handleLoad = useChainHandler(onLoad, () => setStatus('loaded'))

	const handleLoadStart = useChainHandler(onLoadStart, () =>
		setStatus('loading')
	)

	const handleError = useChainHandler(onError, () => setStatus('error'))

	return (
		<poly.img
			src={src}
			style={style}
			onLoad={handleLoad}
			onLoadStart={handleLoadStart}
			onError={handleError}
			{...otherProps}
		/>
	)
}
