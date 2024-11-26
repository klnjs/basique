import { Editor } from '@klnjs/react-editor'
import classes from './editor.module.css'

export default () => (
	<Editor
		defaultValue="<h1>Hello</h1>"
		className={classes.editor}
		onChange={(value) => console.log(value)}
	/>
)
