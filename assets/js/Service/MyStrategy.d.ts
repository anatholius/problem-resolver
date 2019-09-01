export interface MyStrategy {
    /** nazwa strategii */
    name: string;
    /** add strategy */
    addStrategy: (name: string, params: object) => object;
    /** remove strategy */
    removeStrategy: (name: string) => void;
    /** get strategy */
    getStrategy: (name: string) => object;
}

declare const MyStrategy: MyStrategy;

export default MyStrategy;