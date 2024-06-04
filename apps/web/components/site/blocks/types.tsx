// Nodes are stored as a Map of objects
// Documents are an Array of keys

import { EditorState } from 'lexical'

type UniqueIdentifier = string

type FoundationNodeType = {
  $ref: UniqueIdentifier
  type: string
  properties: object
}

export type ContainerNodeType = FoundationNodeType & {
  type: 'container'
  children: string[]
}

export type ColumnsNodeType = Omit<ContainerNodeType, 'type'> & {
  type: 'columns'
  count: number
}

export type TextNodeType = FoundationNodeType & {
  type: 'text'
  properties: {
    font: string
    fontSize: number
    editorState: EditorState
  }
}

export type HeadingNodeType = Omit<TextNodeType, 'type'> & {
  type: 'heading'
  properties: {
    level: 1 | 2 | 3 | 4 | 5
  }
}

export type ImageNodeType = FoundationNodeType & {
  type: 'image'
  properties: {
    src: string
    alt: string
  }
}

export type NodeType =
  | ContainerNodeType
  | ColumnsNodeType
  | TextNodeType
  | HeadingNodeType
  | ImageNodeType

export function isContainer(node: NodeType): node is ContainerNodeType {
  return node.type === 'container'
}

export function isColumns(node: NodeType): node is ColumnsNodeType {
  return node.type === 'columns'
}

export function isText(node: NodeType): node is TextNodeType {
  return node.type === 'text'
}

export function isHeading(node: NodeType): node is HeadingNodeType {
  return node.type === 'heading'
}

export function isImage(node: NodeType): node is ImageNodeType {
  return node.type === 'image'
}

export type NodeViewerPropType<T extends NodeType> = {
  mode: 'view'
  node: T
}

export type ContainerNodeViewerPropType<T extends NodeType> =
  NodeViewerPropType<T> & {
    nodes: Map<UniqueIdentifier, NodeType>
  }

export type NodeEditorPropType<T extends NodeType> = Omit<
  NodeViewerPropType<T>,
  'mode'
> & {
  mode: 'edit'
  selected?: UniqueIdentifier
}

export type ContainerNodeEditorPropType<T extends NodeType> =
  NodeEditorPropType<T> & {
    nodes: NodeType[]
  }

export function isViewer<T extends NodeType>(
  props: NodeViewerPropType<T> | NodeEditorPropType<T>,
): props is NodeViewerPropType<T> {
  return props.mode === 'view'
}

export function isEditor<T extends NodeType>(
  props: NodeViewerPropType<T> | NodeEditorPropType<T>,
): props is NodeEditorPropType<T> {
  return props.mode === 'edit'
}

export function isViewerContainer<T extends NodeType>(
  props: ContainerNodeViewerPropType<T> | ContainerNodeEditorPropType<T>,
): props is ContainerNodeEditorPropType<T> {
  return props.mode === 'view'
}

export function isEditorContainer<T extends NodeType>(
  props: ContainerNodeViewerPropType<T> | ContainerNodeEditorPropType<T>,
): props is ContainerNodeEditorPropType<T> {
  return props.mode === 'edit'
}
