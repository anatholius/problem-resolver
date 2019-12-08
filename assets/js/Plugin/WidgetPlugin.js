import SwipeableCollectionWidget
    from "../Patterns/Prototype/ConcretePrototype/SwipeableWidget/SwipeableCollectionWidget";
import SwipeableItemWidget from "../Patterns/Prototype/ConcretePrototype/SwipeableWidget/SwipeableItemWidget";

let logInside = true;

const WidgetPlugin = {
    name: 'widget',
    // extend app params with resource params
    params: {
        widget: false,
    },
    create: function () {
        const app = this;
        // extend app methods with resource methods when app instance just created


        // widgetFactory.setFormConfig(new CompanyConfig());

        // const widgetFactory = new WidgetFactory(type);
        // widgetFactory.setApp(app);
        // return widgetFactory;

        app.widget = {
            /**
             *
             * @param type - type of collection widget (simple, card)
             * @returns {Builder}
             * @constructor
             */
            SwipeableCollection: (type) => {
                console.log('plugin widget SwipeableCollection');
                const swipeableCollection = new SwipeableCollectionWidget.Builder(type).withApp(this);
                return new SwipeableCollectionWidget.Builder(type).withApp(this);
            },
            /**
             *
             * @param type - type of item widget (simple, radio, checkbox)
             * @returns {Builder}
             * @constructor
             */
            SwipeableItem: (type) => {
                console.log(`plugin widget SwipeableItem(${type})`);
                const swipeableItem = new SwipeableItemWidget.Builder(type);
                return new SwipeableItemWidget.Builder(type).withApp(this);
                // return new SwipeableItemWidget.Builder(type).withApp(this);
            },
            // CollectionWidget: widgetFactory.createSwipeableCollectionWidget('card').prototypeInstance().collectionWidget,
        };

        app.widget.enable = () => {
            logInside = true;
        };
        app.widget.disable = () => {
            logInside = false;
        };
    },

    on: {
        init: function () {
            const app = this;
            if (app.params.helper) logInside = true;
            if (logInside) console.log('WidgetPlugin init');
        },
    },
};
export default WidgetPlugin;