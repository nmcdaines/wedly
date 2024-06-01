'use client'

/*

Example data structure: 

{
  we can then publish version of this page :)

  version: 0,
  // array of refs
  document: [ 'xxx' ],
  nodes: {
    "xxx": {
      path: ['self']
    },
    "yyy": {
      path: ['xxx', 'self]
    }
    ...
  }
}

When rendering the draggable component, we will define a path
  Then when adding nested items we will extend that path

*/

import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

export type Root = 'root'
export type UniqueIdentifier = string

export type Node = {
  id: UniqueIdentifier // this is probably going to be a duplicate (but oh well)
  parent?: UniqueIdentifier | undefined
  type: string
  children?: UniqueIdentifier[]
  properties: object
}

export type ContainerNode = Node & {
  type: 'container'
  children: UniqueIdentifier[]
}

export type CreateNode = Omit<Node, 'id' | 'children'>

export function useStorage() {
  const [documents, setDocuments] = useState<UniqueIdentifier[]>(
    JSON.parse(localStorage.getItem('documents') || '[]') || [],
  )
  const [nodes, setNodes] = useState<Map<UniqueIdentifier, Node>>(
    new Map(Object.entries(JSON.parse(localStorage.getItem('nodes') || '{}'))),
  )

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents))
    localStorage.setItem('nodes', JSON.stringify(Object.fromEntries(nodes)))
  }, [documents, nodes])

  const addNode = (
    parent: UniqueIdentifier | Root,
    index: number,
    node: CreateNode,
  ) => {
    const nodeWithId = {
      id: nanoid(),
      ...node,
    }

    nodes.set(nodeWithId.id, nodeWithId)

    if (parent === 'root') {
      setDocuments((prevDocuments) => [
        ...prevDocuments.slice(0, index),
        nodeWithId.id,
        ...prevDocuments.slice(index),
      ])
    } else {
      const parentNode = nodes.get(parent)

      if (parentNode) {
        parentNode.children = parentNode.children || []

        parentNode.children = [
          ...parentNode.children.slice(0, index),
          nodeWithId.id,
          ...parentNode.children.slice(index),
        ]
      }
    }

    setNodes(new Map(nodes))
    return nodeWithId
  }

  const removeNode = ($ref: string) => {
    const node = nodes.get($ref)

    if (!node) return undefined

    const parent = nodes.get(node.parent ?? '')

    if (parent) {
      parent.children = parent.children?.filter((id) => id !== node.id)
    }

    setDocuments((prevDocuments) =>
      [...prevDocuments].filter((id) => id != node.id),
    )

    nodes.delete(node.id)

    setNodes(new Map(nodes))
  }

  const updateNode = (
    $ref: UniqueIdentifier,
    propertyKey: string,
    value: any,
  ) => {
    const node = nodes.get($ref)

    if (!node) return
    if (!node.properties) {
      node.properties = {}
    }

    node.properties[propertyKey] = value

    setNodes(new Map(nodes))
  }

  return {
    documents,
    nodes,
    addNode,
    removeNode,
    updateNode,
  }
}
