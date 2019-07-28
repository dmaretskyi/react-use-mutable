import { expect } from 'chai'
import { renderHook, act } from '@testing-library/react-hooks'
import { useMutableCallback } from '../src'

describe('useMutableCallback', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useMutableCallback(() => 5))

    expect(result.current()).to.equal(5)
  })

  it('updates value on re-render', () => {
    const { result, rerender } = renderHook(x => useMutableCallback(() => x), { initialProps: 5 })

    act(() => {
      rerender(7)
    })

    expect(result.current()).to.equal(7)
  })

  it('updates are propagated to all returned values', () => {
    const { result, rerender } = renderHook(x => useMutableCallback(() => x), { initialProps: 5 })
    const getValue = result.current

    act(() => {
      rerender(7)
    })

    expect(getValue()).to.equal(7)
  })
})
