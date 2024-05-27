import { createContext, PropsWithChildren, useContext } from 'react'

const EditingContext = createContext<boolean>(false)

export function EditingProvider({ editing, children }: PropsWithChildren<{ editing: boolean }>) {
  return (
    <EditingContext.Provider value={editing}>
      <>{children}</>
    </EditingContext.Provider>
  )
}

export function useEditing() {
  return useContext(EditingContext)
}
