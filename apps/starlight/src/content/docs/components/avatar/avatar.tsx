import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/react-avatar'
import classes from './avatar.module.css'
import image from './react.svg'

export default () => (
	<Avatar className={classes.avatar}>
		<AvatarImage src={image.src} className={classes.image} />
		<AvatarFallback className={classes.fallback}>RK</AvatarFallback>
	</Avatar>
)
