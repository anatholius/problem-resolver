import React from 'react';
import WidgetPrototypeAbstract from "../WidgetPrototypeAbstract";
import SwipeableCollectionWidgetPrototypeException
    from "../../Singleton/Exception/ConcreteException/SwipeableCollectionWidgetPrototypeException";

import SwipeableSimpleItemWidget from "./SwipeableItemWidget/SwipeableSimpleItemWidget";
import SwipeableRadioItemWidget from "./SwipeableItemWidget/SwipeableRadioItemWidget";

/**
 * @class SwipeableCollectionWidgetPrototype
 * @memberOf WidgetPrototype
 * @summary [wzorzec: Prototype -> ConcretePrototype]
 */
export default class SwipeableCollectionWidgetPrototype extends WidgetPrototypeAbstract {
    displayName = 'SwipeableCollectionWidgetPrototype';
    itemPrototype;
    settings = {
        widget: {
            wrapperClass: ['width-100', 'flex-grow-1', 'no-margin-left', 'no-margin-right', 'card-outline'],
            title: null,
            actions: {
                add: {color: 'green', label: 'Dodaj', action: null},
            },
            parentForm: null,
            mediaList: false,
        },
        field: {
            name: null,
        },
        item: {
            type: 'item', //radio, checkbox,item - domyślnie 'item'
            actions: { // akcje dla przycisków które się pokazują po przesunięciu itema w lewo lub w prawo
                left: {},
                right: {
                    edit: {color: 'orange', label: 'Edit', action: null},
                    delete: {color: 'red', label: 'Usuń', action: null},
                },
            },
        },
        data: {
            items: null, // kolekcja itemów
            current: {
                data: null,
                field: {
                    title: null,
                    after: null,
                    subtitle: null,
                    text: null,
                },
                index: null,
            },
            errorMessage: null,
        },
    };
    _handlers;
    _events;

    constructor(config, app) {
        super(config, app);

        // this.settings.onChange = config.handle.controlChange;
        // this.settings.parentForm = config.formConfig.collection.parentForm;

        console.log('config', config);
        console.log('this', this);

        const itemConfig = config ? config.item : {};
        itemConfig.handle = this._handlers;

        switch (config.item.preview.type) {
            case 'simple': {
                // throw new SwipeableCollectionWidgetPrototypeException('SwipeableSimpleItemWidget nie został zaimplementowany');
                this.itemPrototype = (new SwipeableSimpleItemWidget(itemConfig)).prototypeInstance();
                break;
            }
            case 'checkbox': {
                throw new SwipeableCollectionWidgetPrototypeException('SwipeableSimpleItemWidget nie został zaimplementowany');
                // this.itemPrototype = (new SwipeableCheckboxItemWidget(itemConfig)).prototypeInstance();
                // break;
            }
            case 'radio': {
                this.itemPrototype = (new SwipeableRadioItemWidget(itemConfig, this.app)).prototypeInstance();
                break;
            }
            default: {
                throw new SwipeableCollectionWidgetPrototypeException(`Nieznany typ itema widgetu SwipeableCollection!!!
Sprawdź konfigurację '${this.config.__proto__.constructor.name}'`);
            }
        }

        if (config.data) {
            this.updateData(config.data);
        }

    }

    updateData = (data) => {
        // Log.log({
        //     data: data,
        //     this: this,
        // });
        if (data.items) {
            this.settings.data.items = data.items;
        } else if (data.form && data.form[this.settings.field.name]) {
            this.settings.data.items = data.form[this.settings.field.name];
        }

        if (data.current) {
            this.settings.data.current.data = data.current;
            this.settings.data.current.field = this.itemPrototype._composeItem(
                data.current,
                this.config.item.preview,
            );
        }

        if (data.errorMessage) {
            console.log('data.errors', data.errors);
            this.settings.data.errorMessage = data.errorMessage;
            this.settings.widget.wrapperClass = [
                ...this.settings.widget.wrapperClass,
                'item-input-with-error-message',
                'item-input-invalid',
                'border-color-red',
            ];
        }
    };

    configureSettings = (props) => {

        const fieldName = props.field;
        this.settings.name = fieldName;
        this.settings.field.name = fieldName;
        const formConfig = this.config;
        const itemConfig = formConfig.item;
        const fieldConfig = formConfig.fields[fieldName];
        const values = props.data.form;

        console.log('this/this',this);

        this.app.logger.log({
            'this.config': this.config,
            fieldName:     fieldName,
            formConfig:    formConfig,
            fieldConfig:   fieldConfig,
            itemConfig:    itemConfig,
            values:        values,
        });

        if (fieldConfig) {
            this.settings.widget.title = fieldConfig.collection.title;
            this.settings.widget.actions = fieldConfig.collection.preview.actions;
        } else {
            this.settings.widget.title = formConfig.collection.title;
            this.settings.widget.actions = formConfig.collection.preview.actions;
        }

        this.settings.widget.parentForm = this.config.collection.parentForm;


        if (fieldConfig) {
            this.settings.item = fieldConfig.item;
        } else {
            this.settings.item = itemConfig;
        }
        // this.settings.item.type = itemConfig.preview.type;
        //action do itema są ustawiane w kontekście itema zatem nie tu
        // this.settings.item.actions.right.edit.href = 'TODO';
        // this.settings.item.actions.right.edit.onclick = 'TODO';
        // this.settings.item.actions.right.delete.href = 'TODO';
        // this.settings.item.actions.right.delete.onclick = 'TODO';

        // if (props) {
        //     console.groupCollapsed('Zostały dane props z kórymi coś trzeba zrobić');
        //     console.log('props', props);
        //     console.groupEnd();
        // }

        if (props.mediaList) {
            this.settings.widget.mediaList = props.mediaList;
        }
        this.itemPrototype.settings.widget.mediaList = this.settings.widget.mediaList;

        if (props.data) {
            this.updateData(props.data);
        }
    };

    renderItem = (type, item, index) => {
        // console.warn('Będziemy renderować item');
        // Log.log({
        //     this: this,
        //     type: type,
        //     item: item,
        // });
        const useConfig = this.settings.item;
        this.itemPrototype.configure(index, item, useConfig);
        return this.itemPrototype.render();
    };
}