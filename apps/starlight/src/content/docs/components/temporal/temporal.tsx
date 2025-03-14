import {
	Temporal,
	TemporalGroup,
	TemporalLabel,
	TemporalLiteral,
	TemporalSegment,
	TemporalSegments
} from '@klnjs/react-temporal'
import classes from './temporal.module.css'

export default () => (
	<div>
		<Temporal autoFocus type="PlainDateTime" className={classes.temporal}>
			<TemporalLabel className={classes.label}>Temporal</TemporalLabel>
			<TemporalGroup className={classes.group}>
				<TemporalSegments literals>
					{({ unit, value }) =>
						unit === 'literal' ? (
							<TemporalLiteral
								key={value}
								className={classes.literal}
							>
								{value}
							</TemporalLiteral>
						) : (
							<TemporalSegment
								key={unit}
								unit={unit}
								className={classes.segment}
							/>
						)
					}
				</TemporalSegments>
			</TemporalGroup>
		</Temporal>
	</div>
)
