import React from "react";
import * as Helper from "../Helper/Helper";

export default class FormComponent extends React.Component {
    displayName = 'FormComponent';
    _fields;
    _decorators;
    _output = <form></form>;
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {};
    }
    
    getOutput = () => {
        // Log.intention(this.displayName,
        //     `chemy zwrócić reactowi zbudowany formularz w postaci komponentu reactowego`,
        //     `mamy tu:`, this,
        //     `czyli cos jest nie tak jak być powinno zgodnie z intencją.`,
        //     `Istnieje podejrzenie że zbudowany formularz przez buildera nie jest tym co tu zostało zwrócone.`,
        //     `Należy zbadać co autor pominął !!!`,
        // );
        // Log.todo(this.displayName, `Dokończyć zwracanie zbudowanego forma`);
        
        return (
            <form ref={this.ref[this._configForm.item.name]} id={`${this._configForm.item.name}-form`}
                  data-form={this._configForm.item.name}
                  className="form-store-data form-ajax-submit">
                <div className="list no-margin no-hairlines">
                    <ul>
                        {this._fields.map((field, key) => {
                            // return this.context.fields[field]._widget;
                            const fieldConfig = this._configForm.fields[field];
                            // return Widget();
                            console.log('fieldWidget', this.fieldWidget);
                            // return <div key={key}>dupa</div>;
                            const Widget = this.fieldWidget[Helper.ucfirst(fieldConfig.type) + 'Widget'];
                            // Log.warning({
                            //     field:        field,
                            //     fieldConfig:  fieldConfig,
                            //     'this.state': this.state,
                            // });
                            // return <Widget/>;
                            return <Widget key={key} field={field} data={this.state}/>
                        })}
                    </ul>
                </div>
            </form>
        );
    };
    
    render() {
        return this.getOutput();
    }
}