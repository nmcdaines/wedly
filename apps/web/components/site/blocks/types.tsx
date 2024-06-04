// Nodes are stored as a Map of objects
// Documents are an Array of keys

type ContainerNodeType = {
  $ref: string
  properties: object
  children: string[]
}

// FoundationType ($ref ...)
type BlockNodeType = {
  $ref: string
  properties: object
}

type NodeType = ContainerNodeType | BlockNodeType

const a: NodeType = {}
