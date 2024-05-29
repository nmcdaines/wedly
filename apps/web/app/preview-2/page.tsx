'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { nanoid } from 'nanoid'
import {
  Droppable,
  Draggable,
  DroppableDivider,
} from '../../components/dragAndDrop'
import { Text, Image } from 'lucide-react'

type ComponentType = {
  id: string
  icon: string | Element
  label: string
}

const COMPONENTS: ComponentType[] = [
  { id: 'text', icon: <Text className="w-6 h-6" />, label: 'Text' },
  { id: 'image', icon: <Image className="w-6 h-6" />, label: 'Image' },
]

export default function Page() {
  const [elements, setElements] = useState<any[]>([])
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>()

  const [content, setContent] = useState<any[]>([
    {
      id: 'one',
      type: 'text',
      content: 'The quick brown fox jumped over the lazy dog',
    },
    { id: 'two', type: 'text', content: 'One' },
    { id: 'three', type: 'text', content: 'Two' },
    { id: 'four', type: 'text', content: 'Three' },
    { id: 'five', type: 'text', content: 'Four' },
    { id: 'six', type: 'text', content: 'Five' },
  ])

  const activeComponent: ComponentType | undefined = useMemo(() => {
    return COMPONENTS.find((component) => component.id === activeId)
  }, [activeId])

  return (
    <div style={{ height: '100vh' }}>
      {JSON.stringify(elements)}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-3">
          {COMPONENTS.map((component) => (
            <Draggable key={component.id} id={component.id}>
              <ComponentCard
                id={component.id}
                label={component.label}
                icon={component.icon}
              />
            </Draggable>
          ))}
        </div>

        {content.map((item) => (
          <>
            <div key={item.id}>{item.content}</div>
            <DroppableDivider key={item.id} id={item.id} />
          </>
        ))}

        <DragOverlay dropAnimation={null}>
          {activeComponent && (
            <ComponentCard
              id={activeComponent.id}
              label={activeComponent.label}
              icon={activeComponent.icon}
            />
          )}
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

function ComponentCard({ id, label, icon }: ComponentType) {
  return (
    <div className="cursor-pointer bg-slate-700 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg">
      <div className="text-xl font-black">{icon}</div>
      <div className="text-sm">{label}</div>
    </div>
  )
}
