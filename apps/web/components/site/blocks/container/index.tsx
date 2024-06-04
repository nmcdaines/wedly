import { ContainerEditor } from './editor'
import { ContainerViewer } from './viewer'

function Container({ isAuthoring }) {
  const Component = isAuthoring ? ContainerEditor : ContainerViewer

  return <Component />
}
