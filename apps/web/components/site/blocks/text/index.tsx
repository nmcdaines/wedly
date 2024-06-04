import {
  NodeEditorPropType,
  NodeViewerPropType,
  TextNodeType,
  isEditor,
} from '../types'
import { TextEditor } from './editor'
import { TextViewer } from './viewer'

export function Text(
  props: NodeEditorPropType<TextNodeType> | NodeViewerPropType<TextNodeType>,
) {
  if (isEditor(props)) {
    return <TextEditor {...props} />
  }

  return <TextViewer {...props} />
}
