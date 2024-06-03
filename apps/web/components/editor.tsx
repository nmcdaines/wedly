'use client'

import { useEditor } from '../context/editorContext'
import { Draggable, DroppableDivider } from './dragAndDrop'
import { UniqueIdentifier } from '../lib/use-storage'
import cn from 'classnames'
import {
  Text,
  Image,
  Columns,
  TrashIcon,
  Heading,
  Menu,
  Video,
  GalleryHorizontalEnd,
} from 'lucide-react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import { useState, useMemo } from 'react'
import { useStorageContext } from '../context/storageContext'
import { RichTextEditor } from './rte'
import { Button } from './ui/button'
import { TextComponent } from './site/blocks/text'

export type ComponentType = {
  id: string
  icon: string | JSX.Element
  label: string
  grabbed?: boolean
}

export const COMPONENTS: ComponentType[] = [
  { id: 'navigation', icon: <Menu className="w-6 h-6" />, label: 'Navigation' },
  { id: 'heading', icon: <Heading className="w-6 h-6" />, label: 'Heading' },
  { id: 'text', icon: <Text className="w-6 h-6" />, label: 'Text' },
  { id: 'image', icon: <Image className="w-6 h-6" />, label: 'Image' },
  { id: 'columns', icon: <Columns className="w-6 h-6" />, label: 'Columns' },
  { id: 'video', icon: <Video className="w-6 h-6" />, label: 'Video' },
  {
    id: 'image-gallery',
    icon: <GalleryHorizontalEnd className="w-6 h-6" />,
    label: 'Image Gallery',
  },
]

export function Editor() {
  const { documents, nodes, addNode } = useStorageContext()

  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>()

  const activeComponent: ComponentType | undefined = useMemo(() => {
    return COMPONENTS.find((component) => component.id === activeId)
  }, [activeId])

  return (
    <div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="h-screen w-screen bg-slate-700 grid grid-cols-12">
          <div className="col-span-9 p-6 space-y-4">
            <div className="h-[calc(100vh - 80px)] rounded-lg bg-white/90 text-black shadow-2xl overflow-clip">
              Heading
            </div>

            <div className="h-[calc(100vh - 80px)] rounded-lg bg-white/90 text-black shadow-2xl overflow-clip">
              <Stage refs={documents} nodes={nodes} />

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

            <div className="h-[calc(100vh - 80px)] rounded-lg bg-white/90 text-black shadow-2xl overflow-clip">
              Footer
            </div>
          </div>

          <div className="col-span-3">
            <Tools />
          </div>

          <div className="col-span-12">{JSON.stringify(documents)}</div>
        </div>
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

    const index = documents.findIndex((id) => id === over.id)

    addNode('root', index + 1, {
      type: active.id as string,
      properties: { content: 'EMPTY' },
    })
  }
}

export function Tools() {
  return (
    <>
      <div className="flex gap-3 flex-wrap">
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
      <Properties />
      <RichTextEditor />
    </>
  )
}

type StageProps = {
  refs: UniqueIdentifier[]
  nodes: Map<UniqueIdentifier, Node>
  addNode: () => {}
}

export function Stage({ refs, nodes }: StageProps) {
  const { selected, setSelected } = useEditor()
  const { removeNode } = useStorageContext()

  return (
    <div>
      <DroppableDivider key={`divider-top`} id={0} />
      {refs.map(($ref) => {
        const node = nodes.get($ref)

        if (!node) {
          return null
        }

        const isSelected = selected === $ref

        return (
          <div key={`${$ref}`} className="relative group">
            <div
              className={cn(
                !isSelected && 'hidden',
                'absolute right-0 group-hover:block p-2 transition-all',
              )}
            >
              <Button onClick={() => removeNode($ref)}>
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
            <div
              className={cn(
                isSelected && 'outline',
                'cursor-pointer hover:bg-gray-50',
              )}
              onClick={() => setSelected($ref)}
            >
              <RenderComponent node={node} nodes={nodes} />
            </div>
            <DroppableDivider key={`divider-${$ref}`} id={$ref} />
          </div>
        )
      })}
    </div>
  )
}

type RenderComponentProps = {
  node: Node
}

function RenderComponent({ node, nodes }: RenderComponentProps) {
  switch (node.type || '') {
    case 'navigation':
      return <NavigationComponent node={node} />

    // case 'columns':
    //   return <ColumnsComponent node={node} />

    case 'heading':
      return <HeadingComponent node={node} />

    case 'text':
      return <BasicTextComponent node={node} />

    case 'image':
      return <ImageComponent node={node} />

    default:
      return null
  }
}

function HeadingComponent({ node }: RenderComponentProps) {
  return (
    <div>
      Heading
      <TextComponent editorState={node.properties?.editorState} />
      <RichTextEditor alwaysShow $ref={node.id} />
    </div>
  )
}

function NavigationComponent({ node }: RenderComponentProps) {
  return (
    <div>
      <div>Navigation</div>
    </div>
  )
}

function BasicTextComponent({ node }: RenderComponentProps) {
  const { setSelected } = useEditor()

  return (
    <div onClick={() => setSelected(node.id)}>
      <div>Text</div>
      <div>{node?.properties?.content}</div>
      <TextComponent editorState={node.properties?.editorState} />
    </div>
  )
}

function ImageComponent({ node }: RenderComponentProps) {
  const { setSelected } = useEditor()

  return <div onClick={() => setSelected(node.id)}>Image</div>
}

function ColumnsComponent({ node, nodes }: RenderComponentProps) {
  return (
    <div>
      Container
      <div className="grid grid-cols-2">
        <DroppableDivider key={`divider-${$ref}`} id={$ref} />
        <Stage refs={node.children || []} nodes={nodes} />
      </div>
    </div>
  )
}

export function ComponentCard({ id, label, icon, grabbed }: ComponentType) {
  return (
    <div
      className={cn(
        'bg-slate-800 hover:bg-slate-600 text-white w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg',
        grabbed ? 'cursor-grabbing' : 'cursor-grab',
      )}
    >
      <div className="text-xl font-black">{icon}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

// keyPath denoted by "."
// 1234.1234.1234.123432.123123345.34543534534.34534543534.345345345.345345345.345435543.5334534

function Properties() {
  const { removeNode } = useStorageContext()
  const { selected } = useEditor()
  if (!selected) return

  return (
    <div key={`properties-${selected}`}>
      {selected}
      <Button
        className="bg-blue-600 px-4 py-2 rounded-md"
        onClick={() => removeNode(selected)}
      >
        Remove
      </Button>
    </div>
  )
}
