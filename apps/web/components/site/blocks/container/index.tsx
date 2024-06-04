import {
  ContainerNodeEditorPropType,
  ContainerNodeType,
  ContainerNodeViewerPropType,
  isEditorContainer,
} from '../types'
import { ContainerEditor } from './editor'
import { ContainerViewer } from './viewer'

export function Container(
  props:
    | ContainerNodeEditorPropType<ContainerNodeType>
    | ContainerNodeViewerPropType<ContainerNodeType>,
) {
  if (isEditorContainer(props)) {
    return <ContainerEditor {...props} />
  }

  return <ContainerViewer {...props} />
}
