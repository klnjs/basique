import { $getRoot, type EditorState, type LexicalEditor } from 'lexical'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { useCallback } from 'react'
import { LinkNode } from '@lexical/link'
import { HeadingNode } from '@lexical/rich-text'
import { ToolbarPlugin } from './plugins/toolbar/ToolbarPlugin'
import { LinkPlugin } from './plugins/link/LinkPlugin'

export type EditorProps = {
	className?: string
	defaultValue?: string
	onChange?: (value: string) => void
}

export const Editor = ({
	className,
	defaultValue = '',
	onChange
}: EditorProps) => {
	const editorState = useCallback((editor: LexicalEditor) => {
		const root = $getRoot()
		const parser = new DOMParser()
		const dom = parser.parseFromString(defaultValue, 'text/html')
		const nodes = $generateNodesFromDOM(editor, dom)
		root.clear()
		root.append(...nodes)
		// eslint-disable-next-line react-compiler/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = (_state: EditorState, editor: LexicalEditor) => {
		editor.read(() => {
			const html = $generateHtmlFromNodes(editor)

			if (onChange) {
				onChange(html)
			}
		})
	}

	return (
		<div className={className}>
			<LexicalComposer
				initialConfig={{
					namespace: 'name',
					nodes: [HeadingNode, LinkNode],
					editorState,
					onError: console.log
				}}
			>
				<ToolbarPlugin />
				<LinkPlugin />
				<HistoryPlugin />
				<OnChangePlugin ignoreSelectionChange onChange={handleChange} />
				<RichTextPlugin
					contentEditable={<ContentEditable />}
					ErrorBoundary={LexicalErrorBoundary}
				/>
			</LexicalComposer>
		</div>
	)
}
