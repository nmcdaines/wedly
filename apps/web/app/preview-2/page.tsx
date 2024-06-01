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
import cn from 'classnames'

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen w-screen bg-slate-700 grid grid-cols-12">
        <div className="col-span-9 p-6">
          <div className="h-[calc(100vh - 80px)] rounded-lg bg-white/90 text-black shadow-2xl">
            {content.map((item) => (
              <div key={`${item.id}`}>
                <div>{item.content}</div>
                <DroppableDivider key={`divider-${item.id}`} id={item.id} />
              </div>
            ))}

            <DragOverlay dropAnimation={null}>
              {activeComponent && (
                <ComponentCard
                  id={activeComponent.id}
                  label={activeComponent.label}
                  icon={activeComponent.icon}
                  grabbed
                />
              )}
            </DragOverlay>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex gap-3">
            {COMPONENTS.map((component) => (
              <Draggable key={`component-${component.id}`} id={component.id}>
                <ComponentCard
                  id={component.id}
                  label={component.label}
                  icon={component.icon}
                />
              </Draggable>
            ))}
          </div>
        </div>

        <div className="col-span-12">{JSON.stringify(content)}</div>
      </div>
    </DndContext>
  )

  function handleDragStart(event: DragStartEvent) {
    console.log(`event`, event)
    event.active.id
    setActiveId(event.active.id)
  }

  function handleDragEnd({ over, active }: DragEndEvent) {
    if (!over) return

    const updatedContent = [...content]
    updatedContent.splice(
      content.findIndex((item) => item.id === over.id) + 1,
      0,
      {
        id: nanoid(),
        type: active.id,
        content: `EMPTY ${active.id}`,
      },
    )

    setContent(updatedContent)
  }
}

function ComponentCard({ id, label, icon, grabbed }: ComponentType) {
  return (
    <div
      className={cn(
        'bg-slate-800 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg',
        grabbed ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="text-xl font-black">{icon}</div>
      <div className="text-sm">{label}</div>
    </div>
  )
}

// keyPath denoted by "."
// 1234.1234.1234.123432.123123345.34543534534.34534543534.345345345.345345345.345435543.5334534
