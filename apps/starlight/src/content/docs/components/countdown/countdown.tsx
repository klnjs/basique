import {
	Countdown,
	CountdownGroup,
	CountdownSegments,
	CountdownSegment,
	CountdownAnnouncer,
	CountdownLabel
} from '@klnjs/react-countdown'
import classes from './countdown.module.css'

const newYears = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`)

export default () => (
	<Countdown
		locale="en-GB"
		largestUnit="days"
		smallestUnit="seconds"
		until={Date.now() + 20000}
		className={classes.countdown}
		onStatusChange={(status) => console.log(status)}
	>
		<CountdownLabel className={classes.label}>
			Time left til New Years
		</CountdownLabel>
		<CountdownAnnouncer />
		<CountdownGroup className={classes.group}>
			<CountdownSegments format="short">
				{({ unit, value, label }) => (
					<CountdownSegment
						key={unit}
						unit={unit}
						className={classes.segment}
					>
						<div className={classes.value}>
							{value.toString().padStart(2, '0')}
						</div>
						<div className={classes.unit}>{label}</div>
					</CountdownSegment>
				)}
			</CountdownSegments>
		</CountdownGroup>
	</Countdown>
)
