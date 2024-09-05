<script lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/svelte-avatar'
	import classes from './avatar.module.css'
	import image from './svelte.svg'
</script>
 
<Avatar class={classes.avatar} onStatusChange={(status) => console.log(status)}>
	<AvatarImage src={image.src} alt="alt" class={classes.image}  />
	<AvatarFallback class={classes.fallback}>RK</AvatarFallback>
</Avatar>
