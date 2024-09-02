import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/react-avatar'
import image from './avatar.png'
import classes from './avatar.module.css'

export default () => (
	<Avatar className={classes.avatar}>
		<AvatarImage src={image.src} className={classes.image} />
		<AvatarFallback className={classes.fallback}>RK</AvatarFallback>
	</Avatar>
)
