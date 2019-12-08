import FieldBuilderAbstract from "../Abstraction/FieldBuilderAbstract";

export default class CompositeBuilder extends FieldBuilderAbstract {
    displayName = 'CompositeBuilder';
    
    /**
     * @override
     */
    buildField = () => {
        // Log.intention(
        //     this.displayName,
        //     `Mamy obiekt do zbudowania fielda`, this,
        //     `Pytanie brzmi: jak to będziemy robić? Należy:`,
        //     `1° Odpalić obiekt kontrolkie fielda wg typu`,
        //     `   (this._fieldConfig.type) = '${this._fieldConfig.type}'`,
        //     `2° Obdekorować dziada wewnętrznymi dekoratorami z obiektu typu`,
        //     ``,
        //     `i wygląda na to że to by stykło :)`,
        //     `wtedy zwrócić result czy coś tam jak to zostało obmyślane`,
        // );
    }
}