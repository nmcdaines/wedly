import { EditorState } from 'lexical'
import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useEffect, useState } from 'react'

export type TextComponentProps = {
  editorState: EditorState
}

export function TextComponent({ editorState }: TextComponentProps) {
  const [htmlBlock, setHtmlBlock] = useState('')

  useEffect(() => {
    if (!editorState) return

    const editor = createHeadlessEditor({
      nodes: [],
      onError: () => {},
    })

    editor.setEditorState(editor.parseEditorState(editorState))

    editor.update(() => {
      const html = $generateHtmlFromNodes(editor)
      console.log(`html`, html)
      setHtmlBlock(html)
    })
  }, [editorState])

  return <div dangerouslySetInnerHTML={{ __html: htmlBlock }} />
  // return <div>{htmlBlock || ''}</div>
}
