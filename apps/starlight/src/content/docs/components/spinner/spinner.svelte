<script lang="ts">
	import { Spinner, SpinnerTrack, SpinnerThumb } from '@klnjs/svelte-spinner'
	import classes from './spinner.module.css'
</script>

<Spinner class={classes.spinner}>
	<SpinnerTrack class={classes.track} />
	<SpinnerThumb class={classes.thumb} />
</Spinner>
