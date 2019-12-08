
export default class ItemConfig {
    /** @type {string} - nazwa encji */
    name = "";
    /** @type {string} - tytuł wyświetlany */
    title = "";
    /** @type {string} nazwa encji w bazie danych */
    entity = "";
    /**
     * @type {{footer: string, header: string, title: string}}
     * @property {string|function} [header] - nazwa encji lub funkcja
     * @property {string|function} [title] - nazwa encji lub funkcja
     * @property {string|function} [footer] - nazwa encji lub funkcja
     */
    preview = {
        type:   "item",
        header: "",
        title:  "",
        footer: "",
    };
    
    /**
     *
     * @param {string} name
     * @param {string} title
     * @param {string} entity
     * @param {Object} [preview]
     * @param {string|function} preview.type
     * @param {string|function} preview.header
     * @param {string|function} preview.title
     * @param {string|function} preview.footer
     * @param {string} [event] - obiekt eventów pochodzący z kontekstu
     * @param {string} [handle] - obiekt handlerów pochodzących z kontekstu
     */
    constructor(name, title, entity, preview, event, handle) {
        this.name = name;
        this.title = title;
        this.entity = entity;
        this.preview = preview;
        if (event) {
            this.event = event;
        }
        if (handle) {
            this.handle = handle;
        }
    }
    
}