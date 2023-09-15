import { Dispatch, FC, Provider, SetStateAction } from 'react';

type UseStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export type StoreMarker<T> = {
    index: number;
};

export function createStoresContext(): {
    createStore: <T>(initialState: T) => StoreMarker<T>;
    StoreProvider: (
        ...args: Parameters<FC>
    ) => Provider<UseStateReturnType<any>>;
    useStore: <T>(storeMarker: StoreMarker<T>) => UseStateReturnType<T>;
};
