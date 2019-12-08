// import {contextConfig} from "../../Context/Contexts";

export default class Resource {
    displayName = this.constructor.name;
    config = {
        dbName: 'kpir',
        version: 1,
        tables: {
            config: {name: 'config'},
            current: {name: 'current'},
            company: {name: 'company', keyPath: ['owner', 'id']},
            book: {name: 'book', keyPath: ['owner', 'company', 'id']},
            settlement: {name: 'settlement', keyPath: ['owner', 'company', 'book', 'id']},
            document: {name: 'document', keyPath: ['owner', 'company', 'book', 'settlement', 'id']},
            invoice: {name: 'invoice', keyPath: ['owner', 'company', 'book', 'settlement', 'document', 'id']},
            intproof: {
                name: 'intproof',
                keyPath: ['owner', 'company', 'book', 'settlement', 'document', 'id'],
            },
            economicEvent: {name: 'economicEvent', keyPath: ['owner', 'company', 'id']},
            economicOperation: {name: 'economicOperation', keyPath: ['owner', 'company', 'economicEvent', 'id']},
        },
        entity: {
            user: {table: 'config'},
            owner: {table: 'config'},
            company: {table: 'company'},
            book: {table: 'book'},
            settlement: {table: 'settlement'},
            document: {table: 'document'},
            invoice: {table: 'invoice'},
            intproof: {table: 'intproof'},
            economicEvent: {table: 'economicEvent'},
            economicOperation: {table: 'economicOperation'},
        },
    };
    db = null;
    data = {
        config: {},
        current: {},
        collection: {},
    };

    log = [];

    init(config) {
        console.log(`${this.displayName}.init()`, config);

        this.url = config.url;
        return this;
    }

    /**
     * Intencją tej metody jest skonfigurowanie bazy
     *
     * @param data
     * @param namespace
     */
    setupDB = async (data, namespace) => {
        const self = this;
        if (!namespace) {
            namespace = self.config.dbName;
        }
        return await new Promise(function (resolve, reject) {
            let db;
            if (namespace !== self.config.dbName) {
                db = null;
            }

            // If setupDB has already been run and the database was set up, no need to
            // open the database again; just run our callback and return!
            if (db) {
                // callback();
                resolve(self.db);
                return;
            }

            let dbName = namespace === '' ? self.config.dbName : namespace;
            let dbOpen = indexedDB.open(dbName, self.config.version);

            // Fires when the version of the database goes up, or the database is created
            // for the first time
            dbOpen.onupgradeneeded = e => {
                db = e.target['result'];
                if (data) {
                    //Jeśli są dane przy otwieraniu bazy tzn że trzeba utworzyć tabele, inaczej nie ma co zaśmiecać
                    // pamięci. Taka sytuacje jest wtedy go na stronę wejzdie gośc i sobie będzie chciał poklikać
                    // bez tworzenia tabel w bazie

                    const dbTables = Object.keys(self.config.tables);

                    for (let table of dbTables) {
                        if (!self.config.tables[table]) {
                            throw new Error(`Tabela '${table}' nie jest skonfigurowana do użycia w IndexedDB`);
                        }
                        if (!db.objectStoreNames.contains(self.config.tables[table].name)) {
                            if (self.config.tables[table].keyPath) {
                                const objectStore = db.createObjectStore(self.config.tables[table].name, {
                                    keyPath: self.config.tables[table].keyPath,
                                });
                                if (Array.isArray(self.config.tables[table].keyPath)) {
                                    for (let key of self.config.tables[table].keyPath) {
                                        objectStore.createIndex(key, key, {unique: false, multiEntry: true});
                                    }
                                }
                            } else {
                                db.createObjectStore(self.config.tables[table].name);
                            }
                        }
                    }
                    console.groupEnd();
                } else if (db.objectStoreNames.length === 0) {
                    e.target['transaction'].abort();
                    resolve();
                } else {
                    console.log('no data given');
                }
            };

            // Fires once the database is opened (and onupgradeneeded completes, if onupgradeneeded was called)
            dbOpen.onsuccess = e => {
                db = e.target['result'];
                resolve(db);
            };

            // Fires when we can't open the database
            dbOpen.onerror = e => {
                reject(`error[${e.target['error'].code}] ${e.target['error'].message}`);
            };
        });
    };

    /**
     * Intencją tej metody jest otworzyć bazę danych do odczytu i/lub zapisu
     *
     * @param data
     * @return {Promise<*>}
     */
    useDB = async (data) => {
        const self = this;
        if (!self.db) {
            await this.setupDB(data).then(async db => {
                self.db = db;
                return await self.db;
            });
        }
        return await self.db;
    };

    /**
     * Intencją tej metody jest odczytanie wszystkich danych z bazy
     */
    readData = async () => {
        const self = this;
        return await self.useDB().then(async db => {
            if (db) {
                // let data = self.data;
                for (let table of db.objectStoreNames) {
                    await self._tableObject(table).then(result => {
                        if (['config', 'current'].indexOf(table) !== -1) {
                            self.data[table] = result;
                        } else {
                            self.data.collection[table] = result.length ? result : null;
                        }
                    });
                }
                // test for only one company
                // self.data.collection.company = [self.data.collection.company[0]];
                if (self.data.collection.company.length === 1) {
                    await self.setCurrent(self.data.collection.company[0].id, 'company')
                }
                return self.data;
            }
        });
    };

    /**
     * Intencją tej metody jest wypełnienie bazy danych danymi $data
     *
     * @param data
     */
    fillData = async (data) => {
        return await this.useDB(data).then(async () => {
            for (let entityName in data) {
                if (data.hasOwnProperty(entityName)) {
                    await this._saveData(data[entityName], entityName);
                }
            }

            return this.data;
        });
    };

    /**
     * Intencją tej metody jest ustawienie w tabeli 'current' $data o kluczu $name
     *
     * @param data
     * @param name
     */
    setCurrent = async (data, name) => {
        //@important data powinno być konwertowalne do typu 'number'
        const id = Number(data);
        if (isNaN(id)) {
            throw new Error(`Nierawidłowa wartość id='${data}' dla kolekcji '${name}'!`)
        }
        return await this.useDB().then(async () => await this._saveData(id, name));
    };

    /**
     * Intencją tej metody jest ustawienie w tabeli 'current' $data o kluczu $name
     *
     * @param data
     * @param name
     */
    setConfig = async (data, name) => {
        console.log(name, data);
        return await this.useDB().then(async () => await this._saveData(data, name));
    };

    /**
     * Intencją tej metody jest dodanie/aktualizacja danych $data w tabeli kolekcji $name
     *
     * @param data
     * @param name
     */
    setData = async (data, name) => {
        const key = [data.owner, data.id];

        return await this.useDB().then(async (db) => {
            await this._saveData(data, name, key);
            return data;
        });
    };

    /**
     * PRIVATE functions
     */

    /**
     * Pobiera dane z tabeli (store) IndexedDB
     *
     * @param table
     * @private
     */
    _tableObject = async (table) => {
        const self = this;
        return await new Promise((resolve, reject) => {
            const tableObject = self.db.transaction([table]).objectStore(table);
            const keyPath = tableObject.keyPath;
            const request = tableObject.getAll();
            const list = {};
            request.onsuccess = e => {
                if (keyPath) {
                    return resolve(e.target.result);
                } else {
                    const cursorRequest = tableObject.openCursor();
                    cursorRequest.onsuccess = async ce => {
                        const cursor = await ce.target.result;
                        if (cursor) {
                            // console.log(`cursor(${cursor.key}):`, cursor.value);
                            list[cursor.key] = cursor.value;
                            cursor.continue();
                        } else {
                            // console.log(`Entries(${table}) all displayed:`, list);
                            resolve(list)
                        }
                    };
                }
            };
            request.onerror = (e) => {
                // throw e.target['error'].message;
                reject(`[readData].requestKeys: ${e.target['error'].name}(${e.target['error'].code}): ${e.target['error'].message}`);
            };
        });
    };

    /**
     * Zapisuje dane do bazy IndexedDB w zależności od predefiniowanego kontekstu zależnego od typu danych
     *
     * Kiedy dataType jest wartością? - wartość kluczas obiektu - (tabela current/cursor do wyszukiwania)
     *  Powinniśmy dostać {keyName: $entityName, keyValue:number} e.g. {company: 3}
     *  Dane powinny zoistać odczytane z odpowiedniego stora kolekcji poprzez index id
     *  Date trafiają do tabeli 'current'
     *
     * Kiedy dataType jest obiektem? - encja o zdefiniowaym przez data kluczu - (tabela config)
     *  Powinniśmy dostać {entityName:string} oraz {data:object} e.g. {entityName: $data}
     *  Date trafiają do tabeli 'config'
     *
     * Kiedy dataType jest itemem? - entityName to nazwa store który nie jest config natomiast data jest obiektem
     *  Powinniśmy dostać {entityName:string}, {data:object}, {key:keyPath} e.g. {entityName:{$key: $data}}
     *  Date trafiają do tabeli 'config'
     *
     * Kiedy dataType jest kolekcją? - tablica obiektów kolekcji - (tabele kolekcji)
     *  Powinniśmy dostać {data:array} e.g. [{entityName: $values}]
     *  Date trafiają do tabel $entityName
     *
     * @private
     * @param data - dane do zapisu
     * @param entityName - nazwa tabeli/store w której mają być zapisane dane
     */
    _saveData = async (data, entityName, key) => {
        this.log = [];
        /*
         const exampleData = {
            //do tabeli 'current' d.w.({$klucz: $wartość}) zapisywany rekord z kolekcji $klucz o id=$wartość
            company:    3,
            book:       1,
            settlement: 4,
            document:   26,
            //trafiają do tabeli 'config'
            user:       {
                email:        'user@company.com',
                firstName:    'Aldefons',
                lastNameName: 'Ownerski',
            },
            //trafiają do tabel wg indexu
            company:    [
                {
                    companyName: 'Firma A',
                    ...{otherValues: ''},
                },
                {
                    companyName: 'Firma B',
                    ...{otherValues: ''},
                },
            ],
            book:       [
                {
                    year: 2017,
                    ...{otherValues: ''},
                },
                {
                    year: 2018,
                    ...{otherValues: ''},
                },
            ],
        };
         //*/

        let stores = [];


        if (typeof data === 'number') {
            await stores.push('current', entityName);
        } else if (typeof data === 'object' && !Array.isArray(data) && !key) {
            await stores.push('config');
        } else if (typeof data === 'object' && Array.isArray(data) && !key) {
            await stores.push(entityName);
        } else if (typeof data === 'object' && !Array.isArray(data) && key) {
            await stores.push(entityName);
        } else {
            console.error('requested data:', data);
            throw new Error(`Trying to save Data in IndexedDB, but: Unsupported type of data`);
        }
        stores = [...new Set(stores)];

        let tx = null;
        if (this.db) {
            tx = await this.db.transaction(stores, 'readwrite');
        } else {
            throw new Error('No database (self.db) defined!')
        }

        //executing
        if (tx) {
            if (typeof data === 'number') {
                // console.log(`current of ${entityName}:`, data);

                console.log('entityName:', entityName);

                const entityData = await this._get(tx, entityName, data);
                await console.log(`entityData =`, entityData);

                await this._put(tx, 'current', entityData, entityName);
                if (!this.data['current']) {
                    this.data['current'] = {};
                }
                this.data['current'][entityName] = entityData;
                return entityData
            } else if (typeof data === 'object' && !Array.isArray(data) && !key) {
                console.log(`object  of ${entityName}:`, data);
                await this._put(tx, 'config', data, entityName);
                if (!this.data['config']) {
                    this.data['config'] = {};
                }
                this.data['config'][entityName] = data;
                return data;
            } else if (typeof data === 'object' && Array.isArray(data) && !key) {
                console.log(`collection of ${entityName}`, data);
                for (let item of data) {
                    await this._put(tx, entityName, item);
                    if (!this.data['collection']) {
                        this.data['collection'] = {};
                    }
                    if (!this.data['collection'][entityName]) {
                        this.data['collection'][entityName] = [];
                    }
                    await this.data['collection'][entityName].push(item);
                }
            } else if (typeof data === 'object' && !Array.isArray(data) && key) {
                console.log(`item of ${entityName} with key(${key}):`, data['bankAccounts'][0]);
                await this._put(tx, entityName, data);
            } else {
                console.error('requested data:', data);
                throw new Error('Unsupported type of data');
            }
        } else {
            throw new Error('No transaction (tx) defined!');
        }
    };

    /**
     * Add data to IndexedDB
     *
     * @param tx - rozpoczęta transakcja
     * @param table - nazwa tabeli (store)
     * @param data - dane do wstawienia
     * @param key (optional) - klucz pod którym mają być zapisane dane
     * @return {Promise<void>}
     * @private
     */
    _add = async (tx, table, data, key) => {
        const tableObject = tx.objectStore(table);
        let add = null;
        if (key) {
            add = tableObject.add(data[key], key);
        } else {
            add = tableObject.add(data[key]);
        }
        add.onsuccess = async result => {
            //event on put operation
            // console.log(`put.${table}.result`, result);
            this.data[table][key] = await data[key];
        };
    };
    /**
     * Put data to IndexedDB
     *
     * @param tx - rozpoczęta transakcja
     * @param table - nazwa tabeli (store)
     * @param data - dane do aktualizacji/wstawienia
     * @param key (optional) - klucz pod którym mają być zapisane dane
     * @return {Promise<void>}
     * @private
     */
    _put = async (tx, table, data, key) => {
        const tableObject = await tx.objectStore(table);
        if (key) {
            await tableObject.put(data, key);
        } else {
            await tableObject.put(data);
        }
    };
    /**
     * Get data from index TODO: it should get data from store by key also
     *
     * @param tx
     * @param table
     * @param key
     * @private
     */
    _get = async (tx, table, key) => {
        const tableObject = tx.objectStore(table);
        return await new Promise((resolve, reject) => {
            let getIndex = tableObject.index('id');
            let getCursor = getIndex.openCursor(IDBKeyRange.only(key));
            getCursor.onsuccess = async e => {
                const cursor = e.target['result'];
                await resolve(cursor.value);
            };
            getCursor.onerror = e => {
                console.log('Zonkol: ', e.target.error);
                throw new Error(`Wystąpił jednak błąd: ${e.target.error.message}`)
            };
        });
    };
    _delete = async (tx, table, key) => {
        console.error('ResourceClass._delete is TODO');
        throw new Error(`TODO: Należy zaimplementować ResourceClass._delete`);
    };


}