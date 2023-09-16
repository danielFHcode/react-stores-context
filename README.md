# React Scores Context

-   [About](#about)
-   [Usage](#usage)
-   [API](#api)

## About

`react-stores-context` is a simple, one file, one function solution for handling global state in react.

It essentially serves as a wrapper for the [react context API](https://react.dev/reference/react/createContext), But it also adds the ability to use multiple values for one context, define these values from anywhere in your project, and prevent unnecessary rerenders.

## Usage

`react-stores-context` provides one main function for creating a context that stores all of your different stores:

```js
// stores.jsx
import { createStoresContext } from 'react-stores-context';

export const { createStore, Provider, useStore } = createStoresContext();

// some-file.jsx
import { createStore } from './stores.jsx';

export const xStore = createStore(1);

// some-component.jsx
import { xStore } from './some-file.jsx';
import { useStore } from './stores.jsx';

export default function SomeComponent() {
    const [x, setX] = useStore(xStore);

    return <>// Some code using x...</>;
}

// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './stores.jsx';
import SomeComponent from './some-component.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>Your app's code... (presumably using SomeComponent)</Provider>
    </React.StrictMode>
);

// PS: all of these things could also be in one file.
```

## API

### CreateStoresContext (function):

Creates a context for all of your stores, as well as methods for creating and using those stores.

#### Parameters:

None 🙃

#### Return Type:

```ts
{
    createStore: <T>(initialState: T) => StoreMarker<T>;
    Provider: (...args: React.Parameters<FC>) =>
        React.Provider<ReturnType<typeof React.useState<any>>>;
    useStore: <T>(storeMarker: StoreMarker<T>) =>
        ReturnType<typeof React.useState<T>>;
}
```

### StoreMarker (type):

Internal type used for marking the context of a specific store.

```ts
<T>{
    index: number;
}
```
