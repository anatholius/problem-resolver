import LeafBuilder from "./ConcreteBuilder/LeafBuilder";
import CompositeBuilder from "./ConcreteBuilder/CompositeBuilder";
import NullFieldBuilder from "./ConcreteBuilder/NullFieldBuilder";

export default class FormBuilder {
    _context = {
        fields:     {},
        config:     {},
        decorators: {},
    };
    
    _fields;
    _decorators;
    _events;
    
    constructor(builder) {
        
    }
    
    createForm = (builder) => {
        return builder
            .setFields()
            .setDecorators()
            .setEvents()
            .biuld();
        
    };
    
}