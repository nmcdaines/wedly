'use client'

import { createContext, PropsWithChildren, useState, useContext } from 'react'

type EditorContextType = {
  selectedNode?: string
  setSelectedNode: (nodeId: string) => void
  clearSelectedNode: () => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: PropsWithChildren<{}>) {
  const [selectedNode, setSelectedNode] = useState<string | undefined>()

  return (
    <EditorContext.Provider
      value={{ selectedNode, setSelectedNode, clearSelectedNode }}
    >
      {children}
    </EditorContext.Provider>
  )

  function clearSelectedNode() {
    setSelectedNode(undefined)
  }
}

export function useEditor() {
  const context = useContext(EditorContext)

  return {
    selected: context?.selectedNode,
    setSelected,
    clearSelected,
  }

  function setSelected(selected: string) {
    context?.setSelectedNode(selected)
  }

  function clearSelected() {
    context?.clearSelectedNode()
  }
}
