import { Dispatch, SetStateAction, useState } from 'react'
import { useMutable } from './useMutable'

export function useMutableState<S> (initialState: S | (() => S)): [() => S, Dispatch<SetStateAction<S>>]
export function useMutableState<S = undefined> (): [() => S | undefined, Dispatch<SetStateAction<S | undefined>>]
export function useMutableState<S> (initialState?: S | (() => S)) {
  const [value, setValue] = useState<S | undefined>(initialState)
  const getter = useMutable(value)
  return [getter, setValue]
}
