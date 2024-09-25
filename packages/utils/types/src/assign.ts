export type Assign<T, P> = Omit<T, keyof P> & P
