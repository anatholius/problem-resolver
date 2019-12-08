import FieldBuilderAbstract from "../Abstraction/FieldBuilderAbstract";
import TextField from "./Leafs/TextField";


const controlField = (fieldConfig, formConfig) => {
    const fieldClasses = {
        text: new TextField(fieldConfig, formConfig),
        // select:     new SelectField(fieldConfig, formConfig),
        // datepicker: new DatepickerField(fieldConfig, formConfig),
    };
    return fieldClasses[fieldConfig.type];
};

export default class LeafBuilder extends FieldBuilderAbstract {
    displayName = 'LeafBuilder';
    
    /**
     * @override
     */
    buildField = () => {
        const field = controlField(this._fieldConfig, this._formConfig);
        // Log.intention(
        //     this.displayName,
        //     `Mamy obiekt do zbudowania fielda`, this,
        //     `Pytanie brzmi: jak to będziemy robić? Należy:`,
        //     `1° Odpalić obiekt kontrolkie fielda wg typu`,
        //     `   (this._fieldConfig.type) = '${this._fieldConfig.type}'`,
        //     `   wówczas otrzymujemy`, field,
        //     ``,
        //     `   i co dalej?`,
        //     `2° Obdekorować dziada wewnętrznymi dekoratorami z obiektu typu`,
        //     ``,
        //     `i wygląda na to że to by stykło :)`,
        //     `wtedy zwrócić result czy coś tam jak to zostało obmyślane`,
        // );
        if (field) {
            return field.getOutput();
        } else {
            return null;
        }
    };
    
    
}