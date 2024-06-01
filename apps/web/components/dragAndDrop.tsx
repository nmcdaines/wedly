'use client'

import { UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'
import { Plus, PlusCircle } from 'lucide-react'

export function Droppable(props: PropsWithChildren<{ id: string }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <div ref={setNodeRef} className="py-4 px-2">
      {props.children}
    </div>
  )
}

export function DroppableDivider({ id }: { id: UniqueIdentifier }) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="py-4 px-2 flex flex-col">
      <hr
        className={`transition-all rounded-lg border-4 border-blue-600 ${!isOver ? 'opacity-0' : ''}`}
      />
      {isOver && (
        <div className="bg-blue-400 inline-block p-1 rounded-full border border-2 ml-auto mr-auto -translate-y-2/3">
          <Plus className="w-4 h-4" />
        </div>
      )}
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
