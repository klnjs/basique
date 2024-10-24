import { Spinner, SpinnerTrack, SpinnerThumb } from '@klnjs/react-spinner'
import classes from './spinner.module.css'

export default () => (
	<Spinner className={classes.spinner}>
		<SpinnerTrack className={classes.track} />
		<SpinnerThumb className={classes.thumb} />
	</Spinner>
)
