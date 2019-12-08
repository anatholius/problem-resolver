import React from "react";
import {
    AccordionContent,
    Button,
    Card,
    CardContent,
    CardHeader,
    Icon,
    List,
    ListItem,
    NavTitle,
    Segmented,
} from "framework7-react";

/**
 * @class SwipeableCollectionWidget
 * @memberOf WidgetPrototype
 * @summary [wzorzec: Prototype -> ConcretePrototype -> PrototypeInstance]
 */
export default class SwipeableCollectionWidget {
    /**
     * @type {string}
     * @private
     */
    _type = 'card';
    _app;
    _formConfig;
    _itemPrototype = null;
    /**
     * @type {{}}
     * @private
     */
    _handlers = {};
    /**
     * @type {{}}
     * @private
     */
    _events = {};

    /**
     * @type {{
     *      wrapperClass: array,
     *      mediaList: boolean,
     *      parentForm: null?,
     *      title: null,
     *      actions: {
     *          add: {
     *              color: string,
     *              action: null,
     *              label: string
     *          }
     *      }
     * }}
     */
    widget = {
        wrapperClass: ['width-100', 'flex-grow-1', 'no-margin-left', 'no-margin-right', 'card-outline'],
        title: null,
        actions: {
            add: {color: 'green', label: 'Dodaj', action: null},
        },
        parentForm: null,
        mediaList: false,
    };
    /**
     *
     * @type {{name: null}}
     */
    field = {
        name: null,
    };
    /**
     *
     * @type {{
     *      preview: {},
     *      type: string,
     *      actions: {
     *          left: {},
     *          right: {
     *              edit: {
     *                  color: string,
     *                  action: null,
     *                  label: string
     *              },
     *              delete: {
     *                  color: string,
     *                  action: null,
     *                  label: string
     *              }
     *          }
     *      }
     * }}
     */
    item = {
        type: 'item', //radio, checkbox,item - domyślnie 'item'
        actions: { // akcje dla przycisków które się pokazują po przesunięciu itema w lewo lub w prawo
            left: {},
            right: {
                edit: {color: 'orange', label: 'Edit', action: null},
                delete: {color: 'red', label: 'Usuń', action: null},
            },
        },
        preview: {},
    };
    /**
     * @type {{
     *      current: {
     *          data: null,
     *          field: {
     *              subtitle: null|string|function,
     *              after: null|string|function,
     *              text: null|string|function,
     *              title: null|string|function
     *          },
     *          index: null
     *      },
     *      errorMessage: null,
     *      items: null
     *  }}
     */
    data = {
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
    };

    constructor(build) {
        console.log('build', build);
        this._type = build.type;
        this._app = build.app;
        this._formConfig = build.formConfig;

        this._itemPrototype = this._app.widget.SwipeableItem(this._formConfig.item.preview.type)
            .withApp(this._app)
            .withConfig(this._formConfig.item)
            .buildItem();
        // console.log('this._itemPrototype', this._itemPrototype);
        // this._itemPrototype = this._itemPrototype.prototypeInstance();
        // this._itemPrototype = new SwipeableItemWidget.Builder(this._formConfig.item.preview.type).withApp(this).prototypeInstance();

        /*
        switch (this._formConfig.item.preview.type) {
            case 'simple': {
                // throw new SwipeableCollectionWidgetPrototypeException('SwipeableSimpleItemWidget nie został zaimplementowany');
                this._itemPrototype = (new SwipeableSimpleItemWidget(this._formConfig.item)).prototypeInstance();
                break;
            }
            case 'checkbox': {
                throw new SwipeableCollectionWidgetPrototypeException('SwipeableSimpleItemWidget nie został zaimplementowany');
                // this._itemPrototype = (new SwipeableCheckboxItemWidget(itemConfig)).prototypeInstance();
                // break;
            }
            case 'radio': {
                this._itemPrototype = (new SwipeableRadioItemWidget(this._formConfig.item, this.app)).prototypeInstance();
                break;
            }
            default: {
                throw new SwipeableCollectionWidgetPrototypeException(`Nieznany typ itema widgetu SwipeableCollection!!!
Sprawdź konfigurację '${this.__proto__.constructor.name}'`);
            }
        }
        //*/
    }

    static get Builder() {
        class Builder {
            constructor(type) {
                this.type = type;
            }

            withApp(app) {
                this.app = app;
                return this;
            }

            withConfig(config) {
                console.log('which should set config');
                this.formConfig = config;
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
             * @returns {SwipeableCollectionWidget}
             */
            buildWidget() {
                const newCollectionWidget = new SwipeableCollectionWidget(this);
                console.log('then should create SwipeableCollectionWidget');
                // const clone = newCollectionWidget._clone();
                // console.log('clone', clone);
                console.log('and return it');
                return newCollectionWidget.collectionWidget;
                // return clone;
            }
        }

        console.log('should return Builder');

        return Builder;
    }

    collectionWidget = (props) => {
        // console.log(`${this.__proto__.constructor.name}.collectionWidget:`, this);
        this.configureProps(props);
        const actions = this.widget.actions;
        // console.warn(`Będziemy renderować collectionCardWidget( ${this.name} )`, this);

        let card = null;
        switch (this._type) {
            case 'card':
                card = this._renderCard(props);
                break;
            case 'accordion':
                card = this._renderAccordion(props);
                break;
            case 'list':
                card = this._renderList(props);
                break;
            default:
                card = this._renderList(props);
                break;
        }

        if (this.item.type === 'item') {
            return <li className="item-content">
                <div className="item-inner">
                    {card}
                </div>
            </li>;
        } else return card;
    };

    _renderCard = (props) => {
        return <Card className={this.widget.wrapperClass.join(' ')}>
            <div className={this.data.errorMessage && 'item-input-wrap'}>
                <CardHeader ref={e => this.buttonToPopoverWrapper = e}>
                    <NavTitle>{this.widget.title}</NavTitle>
                    <Segmented>
                        {Object.keys(this.widget.actions).map(key => {
                            const button = this.widget.actions[key];
                            return <Button key={key} tabLinkActive
                                           color={button.color}
                                           href={button.action}
                                           data-parent-form={this.widget.parentForm}>
                                <Icon icon={button.icon}>{button.label}</Icon>
                            </Button>
                        })}
                    </Segmented>
                </CardHeader>
                {this.data.items && <CardContent>
                    <List mediaList={this.widget.mediaList}>
                        {this.data.items.map((item, index) => this.renderItem(this.item.preview.type, item, index))}
                    </List>
                </CardContent>}
                {this.data.errorMessage && <div className="item-input-error-message">{
                        Array.isArray(this.data.errorMessage) ?
                            this.settings.data.errorMessage.join(' • ') :
                            this.settings.data.errorMessage
                    }</div>}
            </div>
        </Card>;
    };
    _renderAccordion = (props) => {
        const accordionContent = <AccordionContent>
            <List mediaList={this.widget.mediaList}>
                {this.data.items.map((item, index) => {
                    // return <div key={index}>item dupa</div>
                    return this.renderItem(this.item.type, item, index)
                })}
            </List>
        </AccordionContent>;

        const accordionItem = <ListItem accordionItem title={this.data.current.field.title}
                                        badge={this.data.items.length}>
            <Icon slot="media" icon="fad fa-briefcase"/>
            {accordionContent}
        </ListItem>;

        if (props.item) {
            return accordionItem;
        } else {
            return (
                <List accordionList inset>
                    {accordionItem}
                </List>
            );
        }
    };
    _renderList = (props) => {
        return <div>dupa collection list widget dla '{this.props.field}' </div>;
    };

    renderItem = (type, item, index) => {
        // console.warn('Będziemy renderować item');
        // this._app.logger.log({
        //     this: this,
        //     'this._itemPrototype': this._itemPrototype,
        //     type: type,
        //     item: item,
        // });
        this._itemPrototype.configure(index, item, this.item);
        return this._itemPrototype.render();
    };


    configureProps = (props) => {
        // console.log(`${this.__proto__.constructor.name}.configureProps[props]`, props);
        // console.log(`${this.__proto__.constructor.name}.configureProps[this]`, this);

        const fieldName = props.field;
        this.name = fieldName;
        this.field.name = fieldName;
        const formConfig = this._formConfig;
        const itemConfig = formConfig.item;
        const fieldConfig = formConfig.fields[fieldName];
        const values = props.data.form;

        // this._app.logger.log({
        //     'this._formConfig': this._formConfig,
        //     fieldName: fieldName,
        //     formConfig: formConfig,
        //     fieldConfig: fieldConfig,
        //     itemConfig: itemConfig,
        //     values: values,
        // });

        if (fieldConfig) {
            this.widget.title = fieldConfig.collection.title;
            this.widget.actions = fieldConfig.collection.preview.actions;
        } else {
            this.widget.title = formConfig.collection.title;
            this.widget.actions = formConfig.collection.preview.actions;
        }

        this.widget.parentForm = this._formConfig.collection.parentForm;


        if (fieldConfig) {
            this.item = fieldConfig.item;
        } else {
            this.item = itemConfig;
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
            this.widget.mediaList = props.mediaList;
        }
        // console.clear();
        // console.log('this', this);
        // console.log('this._itemPrototype', this._itemPrototype);
        this._itemPrototype.widget.mediaList = this.widget.mediaList;

        if (props.data) {
            this.updateData(props.data);
        }
    };


    updateData = (data) => {
        // Log.log({
        //     data: data,
        //     this: this,
        // });
        if (data.items) {
            this.data.items = data.items;
        } else if (data.form && data.form[this.field.name]) {
            this.data.items = data.form[this.field.name];
        }

        if (data.current) {
            this.data.current.data = data.current;
            this.data.current.field = this._itemPrototype._composeItem(
                data.current,
                this._formConfig.item.preview,
            );
        }

        if (data.errorMessage) {
            console.log('data.errors', data.errors);
            this.data.errorMessage = data.errorMessage;
            this.widget.wrapperClass = [
                ...this.widget.wrapperClass,
                'item-input-with-error-message',
                'item-input-invalid',
                'border-color-red',
            ];
        }
    };


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
        console.log(`${this.__proto__.constructor.name}`, this);
        let widget = new this.__proto__.constructor(this._formConfig);
        let keys = Object.keys(this);
        keys.forEach(k => {
            widget.setProperty(k, this[k]);
        });
        console.log(', clone it:', widget);

        return widget;
    };
}