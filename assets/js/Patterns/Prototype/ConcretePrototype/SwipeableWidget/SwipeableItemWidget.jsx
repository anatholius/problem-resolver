import React from "react";
import {Icon, ListItem, SwipeoutActions, SwipeoutButton} from "framework7-react";

/**
 * @class SwipeableItemWidget
 * @memberOf WidgetPrototype
 * @instance
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableItemWidget {
    /**
     * @type {string}
     * @private
     */
    _type = 'simple';
    _app;
    _itemConfig;
    state = {
        opened: false,
    };

    key = null;
    widget = {
        sortable: false,
        mediaList: null,
    };
    item = {
        name: null,
        value: null,
        defaultChecked: null,
        data: {
            header: '',
            title: '',
            after: '',
            subtitle: '',
            text: '',
            footer: '',
        },
        onChange: null,
        actions: {
            left: {
                btnLeft1: {
                    color: 'blue',
                    label: 'Left1',
                },
            },
            right: {
                btnRight1: {
                    color: 'blue',
                    label: 'Right1',
                },
            },
        },
    };
    data = {};


    constructor(build) {
        console.log('build', build);
        this._type = build.type;
        this._itemConfig = build.itemConfig;
        this._app = build.app;
        this._formConfig = build.formConfig;
    }

    static get Builder() {
        class Builder {
            constructor(type) {
                this.type = type;
            }

            withApp(app) {
                console.log('which should set app object');
                this.app = app;
                return this;
            }

            withConfig(config) {
                console.log('which should set config');
                this.itemConfig = config;
                return this;
            }

            withHandlers(handlers) {
                console.log('and should set handlers');
                this.handle = handlers;
                return this;
            }

            withEvents(events) {
                console.log('and should set events');
                this.event = events;
                return this;
            }

            /**
             *
             * @returns {SwipeableItemWidget}
             */
            buildItem() {
                const newItemWidget = new SwipeableItemWidget(this);
                console.log('then should create SwipeableItemWidget');
                // const clone = newCollectionWidget._clone();
                // console.log('clone', clone);
                console.log('and return it', newItemWidget);
                return newItemWidget;//.itemWidget();
                // return clone;
            }
        }

        // console.log('should return Builder',Builder);

        return Builder;
    }

    configure = (index, item, useConfig) => {
        // console.warn('Konfiguracja itema...',index, item, useConfig);
        this._configureSettings(index, item, useConfig);
    };


    itemWidget = () => {
        return <ListItem key={this.item.key} swipeout radio
                         name={this.item.name}
                         value={this.item.value}
                         defaultChecked={this.item.defaultChecked}
                         header={this.item.data.header}
                         title={this.item.data.title}
                         after={this.item.data.after}
                         subtitle={this.item.data.subtitle}
                         text={this.item.data.text}
                         onClick={(e) => {
                             if (this.state.opened) {
                                 e.preventDefault();
                             }
                         }}
                         footer={this.item.data.footer}
                         onSwipeoutOpen={() => {
                             this.state.opened = true;
                         }}
                         onSwipeoutClosed={() => {
                             this.state.opened = false;
                         }}
                         onChange={e => {
                             if (!this.state.opened) {
                                 // console.log('this',this);
                                 return this.item.onChange(e)
                             } else {
                                 e.preventDefault();
                             }
                         }}
        >
            {this.widget.sortable && <Icon slot="media" icon="fad fa-bars"/>}
            {this._renderActions(this.data, this.key)}
        </ListItem>;
    };

    render = () => {
        return this.itemWidget()
    };

    _composeItem = (item, configPreview) => {
        let itemConfig = {
            name: null,
            value: null,
            defaultChecked: null,
            data: {
                header: null,
                title: 'Wybierz',
                after: null,
                subtitle: null,
                text: null,
                footer: null,
            },
            onChange: null,
            actions: {
                left: null,
                right: null,
            },
        };

        // this._app.logger.info({
        //     configPreview: configPreview,
        // });

        if (item) {
            if (typeof configPreview.defaultChecked === 'function') {
                itemConfig.defaultChecked = configPreview.defaultChecked(item);
            } else {
                itemConfig.defaultChecked = item[configPreview.defaultChecked];
            }
            if (configPreview.data.title) {
                if (typeof configPreview.data.title === 'function') {
                    itemConfig.data.title = configPreview.data.title(item)
                } else {
                    itemConfig.data.title = item[configPreview.data.title];
                }
            }
            if (configPreview.data.subtitle) {
                let subtitleValue = '';
                if (typeof configPreview.data.subtitle === 'function') {
                    subtitleValue = configPreview.data.subtitle(item)
                } else {
                    subtitleValue = item[configPreview.data.subtitle];
                }
                itemConfig.data.subtitle = subtitleValue;
            }
            if (configPreview.data.after) {
                let afterValue = null;
                if (typeof configPreview.data.after === 'function') {
                    afterValue = configPreview.data.after(item)
                } else {
                    afterValue = item[configPreview.data.after];
                }
                if (this.widget.mediaList) {
                    itemConfig.data.after = afterValue;
                } else {
                    itemConfig.data.footer = afterValue;
                }
            }
            if (configPreview.data.header) {
                let headerValue = null;
                if (typeof configPreview.data.header === 'function') {
                    headerValue = configPreview.data.header(item)
                } else {
                    headerValue = item[configPreview.data.header];
                }
                itemConfig.data.header = headerValue;
            }
            if (configPreview.data.text) {
                let textValue = '';
                if (typeof configPreview.data.text === 'function') {
                    textValue = configPreview.data.text(item);
                } else {
                    textValue = item[configPreview.data.text];
                }
                itemConfig.data.text = textValue;
            }
            if (configPreview.data.footer) {
                let footerValue = null;
                if (typeof configPreview.data.footer === 'function') {
                    footerValue = configPreview.data.footer(item)
                } else {
                    footerValue = item[configPreview.data.footer];
                }
                itemConfig.data.footer = footerValue;
            }
        } else {
            itemConfig = configPreview.emptyValue;
        }

        // console.log('this._app.handle',this._app.handle);
        // console.log('this._app.event',this._app.event);
        // console.log('this._itemConfig.event',this._itemConfig.event);

        itemConfig.onChange = this._app.event[this._itemConfig.event];

        if (configPreview.actions.left) {
            if (!itemConfig.actions) {
                itemConfig.actions = {};
            }
            itemConfig.actions.left = configPreview.actions.left
        }
        if (configPreview.actions.right) {
            if (!itemConfig.actions) {
                itemConfig.actions = {};
            }
            itemConfig.actions.right = configPreview.actions.right
        }
        return itemConfig;
    };

    _configureSettings = (index, item, useConfig) => {
        // console.warn('Konfiguracja settings', this.config);
        this.data = item;
        // this.item = this._composeItem(item, this.config.preview);
        this.item = this._composeItem(item, useConfig.preview);
        this.item.key = index;
        this.item.name = this._itemConfig.name;
        this.item.value = item.id;

    };

    _renderActions = (item, index) => {
        const itemActions = this.item.actions;
        return <React.Fragment>
            {itemActions.left && this._renderAction('left', item, index)}
            {itemActions.right && this._renderAction('right', item, index)}
        </React.Fragment>
    };

    _renderAction = (side, item, index) => {
        // console.info('rendering action with index', index);
        const actionsProps = {};
        if (side === 'left') {
            actionsProps.left = true;
        } else {
            actionsProps.right = true;
        }
        const itemActions = this.item.actions;
        return <SwipeoutActions {...actionsProps}>
            {Object.keys(itemActions[side]).map((action, i) => {
                const buttonProps = {
                    color: itemActions[side][action].color,
                };
                if (typeof itemActions[side][action].action === 'string') {
                    buttonProps.href = `/${item.id === null ? 'collection' : 'form'}/${itemActions[side][action].action}/${item.id === null ? index : item.id}/`;
                } else if (typeof itemActions[side][action].action === 'function') {
                    buttonProps.onClick = itemActions[side][action].action;
                }
                const buttonAttributes = {
                    label: itemActions[side][action].label,
                    icon: itemActions[side][action].icon,
                };
                return (
                    <SwipeoutButton key={i} {...buttonProps}>
                        <Icon icon={buttonAttributes.icon}>
                        </Icon>
                        {buttonAttributes.label ? buttonAttributes.label : ''}
                    </SwipeoutButton>
                )
            })}
        </SwipeoutActions>;
    };


    /* PROTOTYPING */


    /**
     * @return {WidgetPrototypeAbstract}
     */
    prototypeInstance = () => {
        return this._clone();
    };

    /**
     * Ustawia właściwość obiektu
     *
     * @param property
     * @param value
     */
    setProperty = (property, value) => {
        this[property] = value;
    };

    /**
     * Kopiuje właściwości prototypu do klona
     *
     * @return {WidgetPrototypeAbstract}
     */
    _clone = () => {
        console.log(`trying to clone......`);
        let widget = new this.constructor(this._itemConfig);
        let keys = Object.keys(this);
        keys.forEach(k => {
            widget.setProperty(k, this[k]);
        });
        widget.app = this.app;

        return widget;
    }
}