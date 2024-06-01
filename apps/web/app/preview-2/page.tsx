'use client'

import { EditorProvider } from '../../context/editorContext'
import { Editor } from '../../components/editor'
import { StorageProvider } from '../../context/storageContext'

export default function Page() {
  return (
    <EditorProvider>
      <StorageProvider>
        <Editor />
      </StorageProvider>
    </EditorProvider>
  )
}
