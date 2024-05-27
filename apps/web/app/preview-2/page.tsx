'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { nanoid } from 'nanoid'
import { Droppable, Draggable } from '../../components/dragAndDrop'

export default function Page() {
  const [elements, setElements] = useState<any[]>([])
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>()

  const draggable = <Draggable id={'text'}>Go ahead, drag me.</Draggable>

  return (
    <div style={{ height: '100vh' }}>
      {JSON.stringify(elements)}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {draggable}
        <Droppable id="one">Drop Here (One)</Droppable>
        <Droppable id="two">Drop Here (Two)</Droppable>
        <Droppable id="three">Drop Here (Three)</Droppable>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div
              className=""
              style={{
                display: 'block',
                background: 'red',
                borderRadius: '16px',
                width: '48px',
                height: '64px',
              }}
            >
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )

  function handleDragStart(event: DragStartEvent) {
    console.log(`event`, event)
    event.active.id
    setActiveId(event.active.id)
  }

  function handleDragEnd({ over, active }: DragEndEvent) {
    if (!over) return

    setElements([...elements, { id: nanoid(), el: active.id, over: over.id }])
  }
}
