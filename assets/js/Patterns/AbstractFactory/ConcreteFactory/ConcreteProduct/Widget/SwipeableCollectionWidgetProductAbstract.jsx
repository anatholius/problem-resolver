export default class SwipeableCollectionWidgetProductAbstract {
    displayName = 'AbstractSwipeableCollectionWidget';

    _prototype;
    app;

    constructor(prototype,app) {
        this._prototype = prototype;
        this.app = app;
    }
    
}