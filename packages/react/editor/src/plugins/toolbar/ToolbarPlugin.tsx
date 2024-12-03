import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLinkState } from '../link/LinkPlugin'

const LowPriority = 1

const createItemStyle = (active: boolean) => ({
	width: 32,
	height: 32,
	background: active ? 'black' : 'green'
})

const createRootStyle = () => ({
	display: 'flex'
})

export const ToolbarPlugin = () => {
	const toolbarRef = useRef(null)
	const [editor] = useLexicalComposerContext()
	const [canUndo, setCanUndo] = useState(false)
	const [canRedo, setCanRedo] = useState(false)
	const [isLink, { show, dialog }] = useLinkState()
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)

	const sync = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			setIsBold(selection.hasFormat('bold'))
			setIsItalic(selection.hasFormat('italic'))
			setIsUnderline(selection.hasFormat('underline'))
			setIsStrikethrough(selection.hasFormat('strikethrough'))
		}
	}, [])

	useEffect(
		() =>
			mergeRegister(
				editor.registerUpdateListener(({ editorState }) => {
					editorState.read(sync)
				}),
				editor.registerCommand(
					SELECTION_CHANGE_COMMAND,
					() => {
						sync()
						return false
					},
					LowPriority
				),
				editor.registerCommand(
					CAN_UNDO_COMMAND,
					(payload) => {
						console.log(payload)
						setCanUndo(payload)
						return false
					},
					LowPriority
				),
				editor.registerCommand(
					CAN_REDO_COMMAND,
					(payload) => {
						setCanRedo(payload)
						return false
					},
					LowPriority
				)
			),
		[editor, sync]
	)

	return (
		<div ref={toolbarRef} style={createRootStyle()}>
			<button
				disabled={!canUndo}
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined)
				}}
				style={createItemStyle(canUndo)}
				aria-label="Undo"
			>
				<i className="format undo" />
			</button>
			<button
				disabled={!canRedo}
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined)
				}}
				style={createItemStyle(canRedo)}
				aria-label="Redo"
			>
				<i className="format redo" />
			</button>
			<button
				style={createItemStyle(isBold)}
				aria-label="Format Bold"
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
				}}
			>
				<i className="format bold" />
			</button>
			<button
				style={createItemStyle(isItalic)}
				aria-label="Format Italics"
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
				}}
			>
				<i className="format italic" />
			</button>
			<button
				style={createItemStyle(isUnderline)}
				aria-label="Format Underline"
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
				}}
			>
				<i className="format underline" />
			</button>
			<button
				style={createItemStyle(isStrikethrough)}
				aria-label="Format Strikethrough"
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
				}}
			>
				<i className="format strikethrough" />
			</button>
			<button
				style={createItemStyle(isLink)}
				aria-label="Justify Align"
				onClick={show}
			>
				<i className="chain justify-align" />
			</button>
			<button
				style={createItemStyle(false)}
				aria-label="Left Align"
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
				}}
			>
				<i className="format left-align" />
			</button>
			<button
				style={createItemStyle(false)}
				aria-label="Center Align"
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
				}}
			>
				<i className="format center-align" />
			</button>
			<button
				style={createItemStyle(false)}
				aria-label="Right Align"
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
				}}
			>
				<i className="format right-align" />
			</button>
			<button
				style={createItemStyle(false)}
				aria-label="Justify Align"
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
				}}
			>
				<i className="format justify-align" />
			</button>

			{dialog}
		</div>
	)
}
