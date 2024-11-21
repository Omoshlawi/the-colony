import React from 'react'
import { useSesionStore } from './useSessionStore'

export const useSession = () => {
  const session = useSesionStore((state)=>state)
}

