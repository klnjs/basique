import {
	Paginator,
	PaginatorButton,
	PaginatorEllipsis,
	PaginatorPage,
	PaginatorPages
} from '@klnjs/react-paginator'
import classes from './paginator.module.css'

export default () => (
	<Paginator pages={10} defaultPage={5} className={classes.paginator}>
		<PaginatorButton action="dec" className={classes.button} />
		<PaginatorPages>
			{({ type, page }) =>
				type === 'ellipsis' ? (
					<PaginatorEllipsis
						key={page}
						className={classes.ellipsis}
					/>
				) : (
					<PaginatorPage
						key={page}
						page={page}
						className={classes.page}
					/>
				)
			}
		</PaginatorPages>
		<PaginatorButton action="inc" className={classes.button} />
	</Paginator>
)
