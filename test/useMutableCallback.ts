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

  it('passes callback args through', () => {
    const { result } = renderHook(x => useMutableCallback(a => x + a), { initialProps: 5 })
    expect(result.current(3)).to.equal(8)
  })

  it('passes callback args over updates', () => {
    const { result, rerender } = renderHook(x => useMutableCallback(a => x + a), { initialProps: 5 })
    act(() => {
      rerender(7)
    })
    expect(result.current(3)).to.equal(10)
  })

  it('passes callback args over updates to all references', () => {
    const { result, rerender } = renderHook(x => useMutableCallback(a => x + a), { initialProps: 5 })
    const callback = result.current
    act(() => {
      rerender(7)
    })
    expect(callback(3)).to.equal(10)
  })

  it('works with multiple arguments', () => {
    const { result } = renderHook(x => useMutableCallback((a, b) => [x, a, b]), { initialProps: 5 })
    expect(result.current(6, 7)).to.deep.equal([5, 6, 7])
  })
})
