import { useMutable } from './useMutable'

export function useMutableCallback<T extends (...args: any) => any>(callback: T) {
  const mutable = useMutable(callback)
  const mutableCallback = (...args: Parameters<T>): ReturnType<T> => mutable()(...args)
  return mutableCallback
}
