'use client'

import { CSSProperties, PropsWithChildren } from 'react'
import design1 from '../../designs/design-1.json'
import { EditingProvider, useEditing } from './editing-context'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function Page() {
  return (
    <div>
      <title>Preview</title>

      {/* {design1.children.map((item) => {
        return <div>{item.type}</div>
      })} */}

      <EditingProvider editing={false}>
        <RenderComponent {...design1} />
      </EditingProvider>

      {JSON.stringify(design1)}
    </div>
  )
}

type ComponentBase = {
  style: object
}

type ComponentType =
  | ContainerType
  | SiteNavType
  | ImageType
  | HeroType
  | TextType

function RenderComponent(props: ComponentType) {
  switch (props.type) {
    case 'image':
      return <ImageComponent {...props} />

    case 'container':
      return <ContainerComponent {...props} />

    case 'hero':
      return <HeroComponent {...props} />

    case 'site-nav':
      return <SiteNavComponent {...props} />

    case 'text':
      return <TextComponent {...props} />

    default:
      return <div>Unknown</div>
  }
}

type ContainerType = ComponentBase & {
  type: 'container'
  children: ComponentType[]
}

function ContainerComponent({ children, style }: ContainerType) {
  return (
    <ComponentWrapper type="container">
      <div
        style={
          style
          // { display: 'flex', flexDirection: 'column', ...style }
        }
      >
        {children?.map(RenderComponent)}
      </div>
    </ComponentWrapper>
  )
}

type SiteNavType = ComponentBase & {
  type: 'site-nav'
  links: { name: string; href: string }[]
  linkStyle: object
  style?: CSSProperties
}

const LinkComponent = styled.a<{ style: CSSProperties }>((props) => ({
  transition: 'all',
  ...props.style,
  ':hover': {
    ...(props.style?.[':hover'] || {}),
  },
}))

function SiteNavComponent({ style, links, linkStyle = {} }: SiteNavType) {
  return (
    <ComponentWrapper type="site-nav">
      <div style={style}>
        {links.map(({ name, href }) => {
          return (
            <LinkComponent href={href} style={linkStyle}>
              {name}
            </LinkComponent>
          )
        })}
      </div>
    </ComponentWrapper>
  )
}

type ImageType = ComponentBase & {
  type: 'image'
  src: string
  alt: string
}

function ImageComponent({ style, src, alt }: ImageType) {
  return (
    <ComponentWrapper type="image">
      <img style={{ ...style }} src={src} alt={alt} />
    </ComponentWrapper>
  )
}

type HeroType = ComponentBase & {
  type: 'hero'
  children: ContainerType[]
}

function HeroComponent({ style = {}, children }: HeroType) {
  return (
    <ComponentWrapper type="hero">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          position: 'relative',
          ...style,
        }}
      >
        {children.map(RenderComponent)}
      </div>
    </ComponentWrapper>
  )
}

type TextType = ComponentBase & {
  type: 'text'
  content: string
}

const TextRoot = styled.div<ComponentBase>((props) => ({
  fontWeight: 'bold',
  ...props.style,
}))

function TextComponent({ content, style }: TextType) {
  return (
    <TextRoot
      style={style}
      contentEditable
      onBlur={(e) => console.log('event', e)}
    >
      {content}
    </TextRoot>
  )
}

function ComponentWrapper({
  type,
  children,
}: PropsWithChildren<{ type: string }>) {
  const editing = useEditing()

  if (editing) {
    return (
      <div
        style={
          editing
            ? {
                padding: '20px',
                border: '1px solid white',
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
                borderRadius: '16px',
              }
            : {}
        }
      >
        <div style={{ position: 'absolute' }}>{type}</div>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
