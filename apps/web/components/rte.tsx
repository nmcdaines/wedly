'use client'

import { useLayoutEffect, useState } from 'react'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useStorageContext } from '../context/storageContext'
import { useEditor } from '../context/editorContext'
import { Button } from './ui/button'

const theme = {
  // Theme styling goes here
  //...
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error)
}

export function RichTextEditor() {
  const { selected } = useEditor()
  const { nodes, updateNode } = useStorageContext()

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  }

  const [text, setText] = useState<string>('')

  function onChange(text: string) {
    setText(text)
  }

  if (!selected) {
    return null
  }

  return (
    <>
      <LexicalComposer initialConfig={{ ...initialConfig }}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />

        <OnTextChange onChange={onChange} />
      </LexicalComposer>
      <Button
        onClick={() => {
          updateNode(selected, 'content', text)
        }}
      >
        Save !
      </Button>
    </>
  )
}

function OnTextChange({ onChange }: { onChange: (text: string) => void }) {
  const [editor] = useLexicalComposerContext()

  useLayoutEffect(() => {
    editor.registerUpdateListener(() => {
      onChange(editor.getRootElement()?.textContent ?? '')
    })
  }, [editor])

  return null
}
