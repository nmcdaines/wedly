import { useDraggable, useDroppable } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

export function Droppable(props: PropsWithChildren<{ id: string }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  const style = {
    opacity: isOver ? 1 : 0.5,
    width: '100%',
    background: isOver ? 'blue' : '',
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

export function Draggable(props: PropsWithChildren<{ id: string }>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  })

  const style = {
    // Outputs `translate3d(x, y, 0)`
    // transform: CSS.Translate.toString(transform),
  }

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  )
}
