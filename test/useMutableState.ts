import { expect } from 'chai'
import { act, renderHook } from '@testing-library/react-hooks'
import { useMutableState } from '../src'

describe('useMutableState', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useMutableState(5))

    expect(result.current[0]()).to.equal(5)
  })

  it('returns undefined if initial value is not provided', () => {
    const { result } = renderHook(() => useMutableState())

    expect(result.current[0]()).to.equal(undefined)
  })

  it('preserves value on re-render', () => {
    const { result, rerender } = renderHook(x => useMutableState(x), { initialProps: 5 })

    act(() => {
      rerender(7)
    })

    expect(result.current[0]()).to.equal(5)
  })

  it('setter updates the value', () => {
    const { result } = renderHook(() => useMutableState(5))

    act(() => {
      result.current[1](7)
    })

    expect(result.current[0]()).to.equal(7)
  })

  it('updates are propagated to all returned values', () => {
    const { result } = renderHook(() => useMutableState(5))
    const getValue = result.current[0]

    act(() => {
      result.current[1](7)
    })

    expect(getValue()).to.equal(7)
  })

  it('can provide initial state as getter function', () => {
    const { result } = renderHook(() => useMutableState(() => 5))

    expect(result.current[0]()).to.equal(5)
  })

  it('can set the value using update function', () => {
    const { result } = renderHook(() => useMutableState(5))

    act(() => {
      result.current[1](x => x + 1)
    })

    expect(result.current[0]()).to.equal(6)
  })

})
