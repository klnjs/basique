import { useState, useEffect } from 'react'
import { useCallbackRef } from '@klnjs/react-core'

export type AvatarStatus = 'idle' | 'loading' | 'loaded' | 'error'

export type UseAvatarOptions = {
	onStatusChange?: (status: AvatarStatus) => void
}

export const useAvatar = ({ onStatusChange }: UseAvatarOptions) => {
	const [status, setStatus] = useState<AvatarStatus>('idle')

	const onStatusChangeRef = useCallbackRef(onStatusChange)

	useEffect(() => {
		if (status !== 'idle') {
			onStatusChangeRef(status)
		}
	}, [status, onStatusChangeRef])

	return {
		status,
		setStatus
	}
}
