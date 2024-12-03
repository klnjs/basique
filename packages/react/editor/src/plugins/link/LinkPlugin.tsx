import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $getSelectedNode } from '../../utils/getSelectedNode'
import { $findMatchingParent } from '@lexical/utils'

export const sanitiseUrl = (url: string) => encodeURI(url)

export const validateUrl = (url: string) => url.startsWith('https://')

export type LinkDialogProps = {
	initialValue?: string
	onCancel: () => void
	onSubmit: (url: string) => void
}

export const LinkDialog = ({
	initialValue = '',
	onCancel,
	onSubmit
}: LinkDialogProps) => {
	const [value, setValue] = useState(initialValue)

	return (
		<div>
			<input
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<button onClick={onCancel}>Cancel</button>
			<button onClick={() => onSubmit(sanitiseUrl(value))}>Submit</button>
		</div>
	)
}

export const LinkPlugin = () => (
	<LexicalLinkPlugin
		validateUrl={validateUrl}
		attributes={{
			rel: 'noopener noreferrer',
			target: '_blank'
		}}
	/>
)

export const useLinkState = () => {
	const [editor] = useLexicalComposerContext()
	const [url, setUrl] = useState<string>('')
	const [dialog, setDialog] = useState<ReturnType<typeof LinkDialog>>()

	const sync = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			const node = $getSelectedNode(selection)
			const parent = $findMatchingParent(node, $isLinkNode)

			if (parent) {
				setUrl(parent.getURL())
			} else if ($isLinkNode(node)) {
				setUrl(node.getURL())
			} else {
				setUrl('')
			}
		}
	}, [])

	const show = useCallback(() => {
		setDialog(
			<LinkDialog
				initialValue={url}
				onCancel={() => setDialog(undefined)}
				onSubmit={(mutation) => {
					editor.dispatchCommand(TOGGLE_LINK_COMMAND, mutation)
					setDialog(undefined)
				}}
			/>
		)
	}, [editor, url])

	useEffect(
		() =>
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(sync)
			}),
		[editor, sync]
	)

	return [url !== '', { url, show, dialog }] as [
		boolean,
		{ url: typeof url; show: typeof show; dialog: typeof dialog }
	]
}
