/**
 * @abstract
 */
export default class DecoratorAbstract {
    /**
     * @abstract
     * @param Component
     * @return {Component}
     */
    decorate = (Component) => {
        return Component;
    };
    
}