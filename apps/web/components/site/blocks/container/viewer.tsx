import {
  ContainerNodeType,
  ContainerNodeViewerPropType,
  NodeType,
  NodeViewerPropType,
  isContainer,
  isHeading,
  isText,
} from '../types'

export function ContainerViewer({
  node,
}: ContainerNodeViewerPropType<ContainerNodeType>) {
  if (isHeading(node)) {
    // node.properties.
    // node.properties.level = 1
  }

  return <div></div>
}
