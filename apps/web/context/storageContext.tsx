'use client'

import { createContext, useContext, PropsWithChildren } from 'react'
import {
  CreateNode,
  Node,
  Root,
  UniqueIdentifier,
  useStorage,
} from '../lib/use-storage'

type StorageContextType = {
  documents: UniqueIdentifier[]
  nodes: Map<string, Node>
  addNode: (
    parent: UniqueIdentifier | Root,
    index: number,
    node: CreateNode,
  ) => Node
  removeNode: ($ref: UniqueIdentifier) => void
  updateNode: ($ref: UniqueIdentifier, propertyKey: string, values: any) => void
}

const StorageContext = createContext<StorageContextType | undefined>(undefined)

export function StorageProvider({ children }: PropsWithChildren) {
  const { documents, nodes, addNode, removeNode, updateNode } = useStorage()

  return (
    <StorageContext.Provider
      value={{
        documents,
        nodes,
        addNode,
        removeNode,
        updateNode,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export function useStorageContext() {
  const context = useContext(StorageContext)

  return {
    documents: context?.documents || [],
    nodes: context?.nodes || new Map(),
    addNode,
    removeNode,
    updateNode,
  }

  function addNode(
    parent: UniqueIdentifier | Root,
    index: number,
    node: CreateNode,
  ) {
    if (!context?.addNode) return

    return context.addNode(parent, index, node)
  }

  function removeNode($ref: UniqueIdentifier) {
    if (!context?.removeNode) return

    return context.removeNode($ref)
  }

  function updateNode($ref: UniqueIdentifier, propertyKey: string, value: any) {
    if (!context?.updateNode) return

    return context.updateNode($ref, propertyKey, value)
  }
}
