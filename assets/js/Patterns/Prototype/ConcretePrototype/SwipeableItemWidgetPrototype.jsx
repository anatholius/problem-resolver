import React from 'react';
import WidgetPrototypeAbstract from "../WidgetPrototypeAbstract";
import {Icon, SwipeoutActions, SwipeoutButton} from "framework7-react";


/**
 * @class SwipeableItemWidgetPrototype
 * @memberOf WidgetPrototype
 * @summary [wzorzec: Prototype -> ConcretePrototype]
 */
export default class SwipeableItemWidgetPrototype extends WidgetPrototypeAbstract {
    displayName = 'SwipeableItemWidgetPrototype';
    key;

    settings = {
        key: null,
        widget: {
            sortable: false,
            mediaList: null,
        },
        item: {
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
        },
        data: {},
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
                if (this.settings.widget.mediaList) {
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

        // itemConfig.onChange = this.config.handle[this.config.event];

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
        this.settings.data = item;
        // this.settings.item = this._composeItem(item, this.config.preview);
        this.settings.item = this._composeItem(item, useConfig.preview);
        this.settings.item.key = index;
        this.settings.item.name = this.config.name;
        this.settings.item.value = item.id;

    };

    _renderActions = (item, index) => {
        const itemActions = this.settings.item.actions;
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
        const itemActions = this.settings.item.actions;
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
}