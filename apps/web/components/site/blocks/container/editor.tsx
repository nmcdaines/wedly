'use client'

import { Container } from '.'
import { ContainerNodeType, NodeEditorPropType } from '../types'

// Drag and Drop

export function ContainerEditor(props: NodeEditorPropType<ContainerNodeType>) {
  return (
    <div>
      {props.node.children.map(($ref) => {
        return <Container />
      })}
    </div>
  )
}
