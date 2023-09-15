import { createContext, useContext, useState, createElement as h } from 'react';

export function createStoresContext() {
    const stores = [];
    return {
        createStore(initialState) {
            const ctx = createContext(initialState);
            stores.push({
                ctx,
                Provider({ children }) {
                    return (
                        <ctx.Provider value={useState(initialState)}>
                            {children}
                        </ctx.Provider>
                    );
                },
            });
            return { index: stores.length - 1 };
        },
        StoreProvider: ({ children }) =>
            stores.reduce(
                (nodes, store) => <store.Provider>{nodes}</store.Provider>,
                children
            ),
        useStore: (storeMarker) => useContext(stores[storeMarker.index].ctx),
    };
}
