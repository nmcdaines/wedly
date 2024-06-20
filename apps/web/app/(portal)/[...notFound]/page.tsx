export default function NotFoundPage({ params }: { params: object }) {
  return (
    <div>
      Not found
      <pre>
        <code>{JSON.stringify(params)}</code>
      </pre>
    </div>
  )
}
