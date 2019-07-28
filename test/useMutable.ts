import { expect } from 'chai'
import { renderHook, act } from '@testing-library/react-hooks'
import { useMutable } from '../src'

describe('useMutable', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useMutable(5))

    expect(result.current()).to.equal(5)
  })

  it('updates value on re-render', () => {
    const { result, rerender } = renderHook(x => useMutable(x), { initialProps: 5 })

    act(() => {
      rerender(7)
    })

    expect(result.current()).to.equal(7)
  })

  it('updates are propagated to all returned values', () => {
    const { result, rerender } = renderHook(x => useMutable(x), { initialProps: 5 })
    const getValue = result.current

    act(() => {
      rerender(7)
    })

    expect(getValue()).to.equal(7)
  })
})
