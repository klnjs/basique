import {
	Countdown,
	CountdownAnnouncer,
	CountdownGroup,
	CountdownLabel,
	CountdownSegmentFlipClock,
	CountdownSegments
} from '@klnjs/react-countdown'
import classes from './countdown.module.css'

const newYears = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`)

export default () => (
	<Countdown
		until={newYears}
		locale="en-GB"
		largestUnit="days"
		smallestUnit="seconds"
		className={classes.countdown}
	>
		<CountdownAnnouncer />
		<CountdownLabel className={classes.label}>
			Time left til New Years
		</CountdownLabel>
		<CountdownGroup className={classes.group}>
			<CountdownSegments format="short">
				{({ unit, value, label }) => (
					<CountdownSegmentFlipClock
						key={`flipclock-${unit}`}
						unit={unit}
						label={label}
						value={value.toString().padStart(2, '0')}
						className={classes.flipclock}
					/>
				)}
			</CountdownSegments>
		</CountdownGroup>
	</Countdown>
)
