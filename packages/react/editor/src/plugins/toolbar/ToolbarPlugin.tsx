import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	type TextFormatType
} from 'lexical'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'

export const commands: TextFormatType[] = ['bold', 'italic', 'underline']

export function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext()
	const [formatting, setFormatting] = useState<TextFormatType[]>([])

	const dispatch = useCallback(
		(command: TextFormatType) => () =>
			editor.dispatchCommand(FORMAT_TEXT_COMMAND, command),
		[editor]
	)

	useEffect(
		() =>
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					const selection = $getSelection()

					if ($isRangeSelection(selection)) {
						setFormatting(
							commands.filter((command) =>
								selection.hasFormat(command)
							)
						)
					}
				})
			}),
		[editor]
	)

	return (
		<div>
			{commands.map((command) => (
				<button
					onClick={dispatch(command)}
					style={{
						background: formatting.includes(command)
							? 'red'
							: 'green'
					}}
				>
					{command}
				</button>
			))}

			<button
				onClick={() =>
					editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
						url: 'https://asd.dk'
					})
				}
			>
				Link
			</button>
		</div>
	)
}
