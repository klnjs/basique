import {
	Paginator,
	PaginatorButton,
	PaginatorEllipsis,
	PaginatorPage,
	PaginatorPages
} from '@klnjs/react-paginator'
import classes from './paginator.module.css'

export default () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}
	>
		<Paginator pages={10} defaultPage={5} className={classes.paginator}>
			<PaginatorButton action="dec" className={classes.button} />
			<PaginatorPages siblings={1}>
				{({ type, page, slot }) =>
					type === 'ellipsis' ? (
						<PaginatorEllipsis
							key={slot}
							className={classes.ellipsis}
						/>
					) : (
						<PaginatorPage
							key={slot}
							page={page}
							className={classes.page}
						/>
					)
				}
			</PaginatorPages>
			<PaginatorButton action="inc" className={classes.button} />
		</Paginator>
	</div>
)
