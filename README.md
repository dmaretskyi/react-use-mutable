# react-use-mutable

[![NPM](https://img.shields.io/npm/v/react-use-mutable.svg)](https://www.npmjs.com/package/react-use-mutable)
[![CircleCI](https://img.shields.io/circleci/build/github/Marik-D/react-use-mutable/master.svg)](https://circleci.com/gh/Marik-D/react-use-mutable/tree/master)
[![License](https://img.shields.io/github/license/Marik-D/react-use-mutable.svg)](https://github.com/Marik-D/react-use-mutable/blob/master/UNLICENSE)


Tiny hook that keeps your react state up-to-date in callbacks.

## Installation
```
npm install --save react-use-mutable
yarn add react-use-mutable
```

## Motivation
This library is made for situations where you want to use values from react state
in callbacks that get subscribed to events or passed to child components.

Example:
```javascript
const [count, setCount] = useState(0)

useEffect(() => {
  setInterval(() => {
    console.log(count) // will always print 0 regardless of `count`
  }, 1000) 
}, [])
```

This happens because `count` is only captured on initial render and not updated afterwards.
To keep the most up-to-date state in callbacks you can wrap them in `useMutableCallback` hook:

```javascript
import { useMutableCallback } from 'react-use-mutable'

const [count, setCount] = useState(0)

const printCount = useMutableCallback(() => {
  console.log(count)
})

useEffect(() => {
  setInterval(printCount, 1000) // always prints the latest value
}, [])
```

## Documentation

### `useMutable`

```typescript
function useMutable<T> (value: T): () => T;
```

Creates a getter that returns the latest value passed to this hook. All getters,
no matter at which point in component lifecycle they were created, return the value
from latest render.

### `useMutableCallback`

```typescript
function useMutableCallback<T extends (...args: any) => any>(callback: T):
  (args: Parameters<T>) => ReturnType<T>
```

Helper function to apply `useMutable` to whole callbacks. Returned value can be called
directly in the same way as the original.

**You don't need to use `useMutable` inside mutable callbacks.**
