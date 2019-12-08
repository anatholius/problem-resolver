// const getStackTrace = function () {
//     const obj = {};
//     Error.captureStackTrace(obj, getStackTrace);
//     return obj.stack;
// };
const color = {
    log: {
        text: '#fff',
        bg: '#242424',
    },
    info: {
        text: '#fff',
        bg: '#287aec',
    },
    success: {
        text: '#fff',
        bg: '#339529',
    },
    warning: {
        // text: '#ffdd9e',
        text: '#403827',
        bg: '#f5bd00',
    },
    error: {
        text: '#ff8080',
        bg: '#290000',
    },
    intention: {
        text: '#000',
        bg: '#65b72d',
    },
    effect: {
        text: '#ffc122',
        bg: '#65b72d',
    },
    todo: {
        text: '#a8c023',
        bg: '#242424',
    },
    keys: {
        value: '#c93a36',
        key: '#c863d0',
    },
};
const defaultCollapsed = true;

export default class Log {
    static state = 'standby';

    static helper;

    static _source = (obj) => {
        const lines = obj.stack.split("\n");
        // console.info('lines', lines);
        const result = {
            lines: lines,
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
                result['object'] = 'Object';
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
        for (let item of args) {
            if (!item) continue;

            if (typeof item === 'object' && iterateObjects) {
                let map = null;
                if (item instanceof Map) {
                    map = item;
                } else {
                    map = Log.helper.objectToMap(item);
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
        }
        console.groupCollapsed('trace:');
        console.trace();
        console.groupEnd();
    };

    static extractNames = (objectNames, preparationFunction) => {
        const objectLines = [];
        // eslint-disable-next-line
        for (let [index, lineObject] of objectNames.lineObjects.entries()) {
            if (lineObject === null || lineObject[1].indexOf(preparationFunction) !== -1) {
                continue;
            } else {
            // console.log('index',index);
                objectLines.push(lineObject);
            }
        }
        const source = {
            object: '',
            function: '',
        };
        if (objectLines[0]) {
            const atObjectLineText = objectLines[0][1];
            if (atObjectLineText.indexOf('new') === 0) {
                source.object = atObjectLineText.substr(4);
                source.function = 'constructor()';
            } else if (atObjectLineText.indexOf('.') !== -1) {
                source.object = atObjectLineText.substr(0, atObjectLineText.indexOf('.'));
                source.function = atObjectLineText.substr(atObjectLineText.indexOf('.') + 1) + '()';
            }
        }
        return source
    };

    /** @private */
    static _prepareArgs(givenArgs) {
        const obj = {};
        Error.captureStackTrace(obj);
        let args = this._arguments(givenArgs);


        const objectNames = this._source(obj);

        const source = this.extractNames(objectNames, '_prepareArgs');
        return {args, source};
    }

    static startProcess = (processTitle) => {
        Log.state = 'process';
        // console.clear();
        console.group('Process:', processTitle);
    };
    static endProcess = () => {
        Log.state = 'standby';
        console.groupEnd();
        console.info('PROCESS ENDED');
    };

    static intention() {
        let {args, source} = this._prepareArgs(arguments);

        console.groupCollapsed(`%cIntention%c of %c${source.object}%c ${source.function}`,
            `background: ${color.intention.bg};color: ${color.intention.text};border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }

    static effect() {
        let {args, source} = this._prepareArgs(arguments);

        console.groupCollapsed(`%cEffect%c of %c${source.object}%c ${source.function}`,
            `background: ${color.effect.bg};color: ${color.effect.text};border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }

    static todo() {
        let {args, source} = this._prepareArgs(arguments);

        console.groupCollapsed(`%cTODO%c in %c${source.object}%c ${source.function}`,
            `background: ${color.todo.bg};color: ${color.todo.text};border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: grey`,
            `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`,
            `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args, false);
        console.groupEnd();
    }


    static log() {
        // console.log('arguments', arguments);
        let {args, source} = this._prepareArgs(arguments);

        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%c${source.object}%c ${source.function}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }

    static info() {
        let {args, source} = this._prepareArgs(arguments);

        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cInfo%c %c${source.object}%c ${source.function}`
            , `background: ${color.info.bg};color: ${color.info.text};font-weight:700;border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }


    static success() {
        let {args, source} = this._prepareArgs(arguments);

        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cSuccess%c %c${source.object}%c ${source.function}`
            , `background: ${color.success.bg};color: ${color.success.text};font-weight:700;border:1px solid ${Log.state === 'process' ? '#ff0020' : '#aaa'};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }

    static warning() {
        let {args, source} = this._prepareArgs(arguments);

        console[`group${defaultCollapsed ? 'Collapsed' : ''}`](`%cWarning%c %c${source.object}%c ${source.function}`
            , `background: ${color.warning.bg};color: ${color.warning.text};font-weight:700;border:1px solid ${Log.state === 'process' ? '#ff0020' : color.warning.text};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        this._log(args);
        console.groupEnd();
    }

    static error() {
        let {args, source} = this._prepareArgs(arguments);

        const errorObject = args[0];
        const errorType = errorObject.name;
        const errorMessage = errorObject.message;

        console[`group${defaultCollapsed && !errorType ? 'Collapsed' : ''}`](`%c${errorType ? errorType : 'Error'}%c in %c${source.object}%c ${source.function}`
            , `background: ${color.error.bg};color: ${color.error.text};font-weight:700;border:1px solid ${Log.state === 'process' ? '#ff0020' : color.error.text};padding:2px 7px;border-radius:3px;`, `background: ${color.log.bg};color: ${color.log.text}`
            , `background: ${color.log.bg};color: ${color.log.text};border:1px solid #aaa;color: white;font-weight:700;padding:1px 7px;border-radius:3px`
            , `background: ${color.log.bg};color: ${color.log.text}`);
        if (errorMessage) {
            console.error(errorMessage);
        } else {
            this._log(args);
        }
        console.groupEnd();
    }

}
