import type { CoreProps } from '@klnjs/react-core'

export type IconDescriptionProps = CoreProps<'desc'>

export const IconDescription = (props: IconDescriptionProps) => (
	<desc {...props} />
)
