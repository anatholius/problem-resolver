import * as Helper from "./Helper";

const getStackTrace = function () {
    const obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
const color = {
    log:       {
        text: '#fff',
        bg:   '#242424',
    },
    info:      {
        text: '#fff',
        bg:   '#287aec',
    },
    success:   {
        text: '#fff',
        bg:   '#339529',
    },
    warning:   {
        // text: '#ffdd9e',
        text: '#403827',
        bg:   '#f5bd00',
    },
    error:     {
        text: '#ff8080',
        bg:   '#290000',
    },
    intention: {
        text: '#000',
        bg:   '#65b72d',
    },
    effect:    {
        text: '#ffc122',
        bg:   '#65b72d',
    },
    todo:      {
        text: '#a8c023',
        bg:   '#242424',
    },
    keys:      {
        value: '#c93a36',
        key:   '#c863d0',
    },
};
const defaultCollapsed = true;

export default class Log {
    static process = 0;
    
    static _source = (obj) => {
        const lines = obj.stack.split("\n");
        // console.info('lines', lines);
        const result = {
            lines:       lines,
            lineObjects: [],
        };
        
        const regex = /at\s([^(]+)\s\((.*):(\d+):(\d+)\)/g;
        for (let line of lines) {
            const lineObject = regex.exec(line);
            result.lineObjects.push(lineObject);
        }
        
        const lineObject = result.lineObjects[2];
        
        
        if (lineObject && lineObject[1] && lineObject[1].indexOf('.') !== -1) {
            // return lineObject[1].split('.')[1];
            // return lineObject[1];
            const parts = lineObject[1].split('.');
            result['object'] = parts[0];
            result['function'] = parts[1];
        } else {
            if (lineObject && lineObject[1].indexOf('new') === 0) {
                const parts = lineObject[1].split(' ');
                result['object'] = parts[1];
                result['function'] = 'constructor';
            } else {
                // const parts = lineObject[1].split('.'); 
                result['object'] = 'some Object';
                result['function'] = lineObject ? lineObject[1] : lineObject;
                // return lineObject[1];
            }
        }
        return result;
    };
    static _arguments = (argsData) => {
        let args;
        
        if (Array.isArray(argsData[0])) {
            args = argsData[0];
        } else {
            args = Object.keys(argsData).map(key => argsData[key]);
        }
        return args;
    };
    static _log = (args, iterateObjects = true) => {
        let i = 0;
        for (let item of args) {
            if (!item) continue;
            
            if (typeof item === 'object' && iterateObjects) {
                let map = null;
                if (item instanceof Map) {
                    map = item;
                } else {
                    map = Helper.objectToMap(item);
                }
                
                for (let [key, value] of map) {
                    if (typeof value === 'string') {
                        console.log(`%c${key}%c: %c"${value}"%c`
                            , `background: ${color.log.bg};color: ${color.keys.key};font-weight:700`
                            , `background: ${color.log.bg};color: ${color.log.text}`
                            , `background: ${color.log.bg};color: ${color.keys.value};font-weight:400;font-style:italic`
                            , `background: ${color.log.bg};color: ${color.log.text}`,
                        );
                    } else {
                        console.log(`%c${key}%c:`
                            , `background: ${color.log.bg};color: ${color.keys.key};font-weight:700`
                            , `background: ${color.log.bg};color: ${color.log.text}`
                            , value,
                        );
                    }
                }
            } else {
                console.log(item);
            }
            i++;
        }
        console.groupCollapsed('trace:');
        console.trace();
        console.groupEnd();
    };
    
    /** @private */
    static _prepareIntentionArgs(givenArgs) {
        const obj = {};
        Error.captureStackTrace(obj);
        let args = this._arguments(givenArgs);
        
        
        const objectNames = this._source(obj);
        let object;
        if (args.length === 5) {
            object = objectNames.object;
            if (Array.isArray(args[0])) {
                args = args[0];
            } else {
                object = args[0];
            }
        } else {
            object = args[0];
            args.shift();
        }
        const functionName = objectNames.lineObjects[5] ? objectNames.lineObjects[5][1] : null;
        return {args, objectNames, object, functionName};
    }
    
    static startProcess = (processTitle) => {
        Log.process++;
        console.group('Process:', processTitle);
    };
    static endProcess = () => {
        Log.process--;
        console.groupEnd();
    };
    
    static intention() {
        let {args, objectNames, object, functionName} = this._prepareIntentionArgs(arguments);
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console.groupCollapsed(`%cIntention%c of %c${object}%c ${functionText}`,
            `background: ${color.intention.bg};color: ${color.intention.text};border:1px solid ${Log.process ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }
    
    static effect() {
        let {args, objectNames, object, functionName} = this._prepareIntentionArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console.groupCollapsed(`%cEffect%c of %c${object}%c ${functionText}`,
            `background: ${color.effect.bg};color: ${color.effect.text};border:1px solid ${Log.process ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }
    
    static todo() {
        let {args, objectNames, object, functionName} = this._prepareIntentionArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console.groupCollapsed(`%cTODO%c in %c${object}%c ${functionText}`,
            `background: ${color.todo.bg};color: ${color.todo.text};border:1px solid ${Log.process ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }
    
    
    /** @private */
    static _prepareLogArgs(givenArgs) {
        const obj = {};
        Error.captureStackTrace(obj);
        let args = this._arguments(givenArgs);
        
        const objectNames = this._source(obj);
        let object;
        if (args.length === 1) {
            object = objectNames.object;
            if (Array.isArray(args[0])) {
                args = args[0];
                if (Array.isArray(args[0])) {
                    args.shift();
                }
            }
        } else {
            object = args[0];
            args.shift();
        }
        const functionName = objectNames.lineObjects[5] ? objectNames.lineObjects[5][1] : null;
        return {args, objectNames, object, functionName};
    }
    
    static log() {
        let {args, objectNames, object, functionName} = this._prepareLogArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%c${object}%c ${functionText}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid ${Log.process ? '#ff0020' : '#aaa'};color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }
    
    static info() {
        let {args, objectNames, object, functionName} = this._prepareLogArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cInfo%c %c${object}%c ${functionText}`
            , `background: ${color.info.bg};color: ${color.info.text};font-weight:700;border:1px solid ${Log.process ? '#ff0020' : '#aaa'};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }
    
    /** @private */
    static _prepareSucceedArgs(givenArgs) {
        const obj = {};
        Error.captureStackTrace(obj);
        let args = this._arguments(givenArgs);
        
        const objectNames = this._source(obj);
        let object;
        if (args.length === 1) {
            object = objectNames.object;
            if (Array.isArray(args[0])) {
                args = args[0];
            }
        } else {
            object = args[0];
            args.shift();
        }
        
        const functionName = objectNames.lineObjects[5] ? objectNames.lineObjects[5][1] : null;
        return {args, objectNames, object, functionName};
    }
    
    static success() {
        let {args, objectNames, object, functionName} = this._prepareSucceedArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cSuccess%c %c${object}%c ${functionText}`
            , `background: ${color.success.bg};color: ${color.success.text};font-weight:700;border:1px solid ${Log.process ? '#ff0020' : '#aaa'};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }
    
    static warning() {
        let {args, objectNames, object, functionName} = this._prepareSucceedArgs(arguments);
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cWarning%c %c${object}%c ${functionText}`
            , `background: ${color.warning.bg};color: ${color.warning.text};font-weight:700;border:1px solid ${Log.process ? '#ff0020' : color.warning.text};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }
    
    static error() {
        const obj = {};
        Error.captureStackTrace(obj);
        let args = this._arguments(arguments);
        
        const objectNames = this._source(obj);
        let object;
        if (args.length === 1) {
            object = objectNames.object;
            if (Array.isArray(args[0])) {
                args = args[0];
            }
        } else {
            object = args[0];
        }
        const functionName = objectNames.lineObjects[5] ? objectNames.lineObjects[5][1] : null;
        
        const functionText = `${functionName ? functionName + '()' : objectNames.function ? objectNames.function : ''}`;
        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cError%c %c${object}%c ${functionText}`
            , `background: ${color.error.bg};color: ${color.error.text};font-weight:700;border:1px solid ${Log.process ? '#ff0020' : color.error.text};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }
    
}
