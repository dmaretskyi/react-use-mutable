import { useRef } from 'react'

export function useMutable<T> (value: T) {
  const ref = useRef(value)
  ref.current = value
  return () => ref.current
}
