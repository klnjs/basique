import {
	Paginator,
	PaginatorButton,
	PaginatorPage,
	PaginatorPages
} from '@klnjs/react-paginator'
import classes from './paginator.module.css'

export default () => (
	<Paginator count={101} pageSize={10} className={classes.paginator}>
		<PaginatorButton action="dec" className={classes.button} />
		<PaginatorPages>
			{({ page }) => (
				<PaginatorPage
					key={page}
					page={page}
					className={classes.page}
				/>
			)}
		</PaginatorPages>
		<PaginatorButton action="inc" className={classes.button} />
	</Paginator>
)
