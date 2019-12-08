import React from "react";

export default class Helper {

    static test = () => {
        console.log('this', this);
    };

    static mapToObject = map => {
        const obj = {};
        map.forEach((value, key) => {
            if (value instanceof Set) {
                value = [...value];
            }
            obj[key] = value
        });
        return obj;
    };

    static mapToObjectSimple = map => Object.fromEntries(map);
    static objectToMap = obj => new Map(Object.entries(obj));

    static snakeToCamel = (string) => string.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    static camelToSnake = (string) => string.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();
    static camelToArray = (string) => string.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase().split('_');

    static arrayHasEvery = (arraySource, arrayTarget) => arrayTarget.every(v => arraySource.includes(v));
    static arrayHasAny = (arraySource, arrayTarget) => {
        for (let some of arraySource) {
            if (arrayTarget.includes(some)) {
                return true;
            }
        }
    };

    static missingTables = (arraySource, toFind) => toFind.filter(e => !arraySource.includes(e));

// static renderComponent(component) {
//     return renderToString(component);
// }

    static lcfirst(str) {
        str += '';
        let f = str.charAt(0).toLowerCase();
        return f + str.substr(1);
    }

    static ucfirst(str) {
        str += '';
        let f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }

    static populate(object, entity, data) {
        if (entity && data) {
            switch (entity) {
                case 'owner':
                    break;
                case 'company':
                    object.company = {
                        id: data['id'],
                        companyName: data['companyName'],
                        partnership: data['partnership'],
                        street: data['street'],
                        house: data['house'],
                        appartment: data['appartment'],
                        postalCode: data['postalCode'],
                        city: data['city'],
                        nip: data['nip'],
                        regon: data['regon'],
                        foundingDate: Helper.formatDate(data['foundingDate']),
                        isPartnership: data['isPartnership'],
                        bankAccounts: data['bankAccounts'],
                    };
                    object.contractors = data['contractors'];
                    object.books = data['books'];
                    break;
                case 'book':
                    object.book = {
                        id: data['id'],
                        year: data['year'],
                        col7: data['col7'],
                        col8: data['col8'],
                        col9: data['col9'],
                        col10: data['col10'],
                        col11: data['col11'],
                        col12: data['col12'],
                        col13: data['col13'],
                        col14: data['col14'],
                        col15: data['col15'],
                        col16b: data['col16b'],
                        z1: data['z1'],
                        z2a: data['z2a'],
                        z2b: data['z2b'],
                        z2c: data['z2c'],
                        z2d: data['z2d'],
                        z2e: data['z2e'],
                        z2f: data['z2f'],
                        z2: data['z2'],
                        z3: data['z3'],
                    };
                    break;
                case 'settlement':
                    object.settlement = {
                        id: data['id'],
                        settlementDate: data['settlementDate'],
                        income: data['income'],
                        incomeCumulative: data['incomeCumulative'],
                        costs: data['costs'],
                        costsCumulative: data['costsCumulative'],
                        profit: data['profit'],
                        profitCumulative: data['profitCumulative'],
                        social: data['social'],
                        socialCumulative: data['socialCumulative'],
                        socialDeduction: data['socialDeduction'],
                        health: data['health'],
                        healthCumulative: data['healthCumulative'],
                        healthDeduction: data['healthDeduction'],
                        taxBase: data['taxBase'],
                        tax: data['tax'],
                        taxCumulative: data['taxCumulative'],
                        closed: data['closed'],
                        documents: data['documents'],
                    };
                    break;
                case 'document':
                    object.document = {
                        id: data['id'],
                        type: data['type'],
                        col1: data['col1'],
                        col2: data['col2'],
                        col3: data['col3'],
                        col4: data['col4'],
                        col5: data['col5'],
                        col6: data['col6'],
                        col7: data['col7'],
                        col8: data['col8'],
                        col9: data['col9'],
                        col10: data['col10'],
                        col11: data['col11'],
                        col12: data['col12'],
                        col13: data['col13'],
                        col14: data['col14'],
                        col15: data['col15'],
                        col16a: data['col16a'],
                        col16b: data['col16b'],
                        col17: data['col17'],
                    };
                    break;
                case 'invoice':
                    object.invoice = {
                        id: data['id'],
                        city: data['city'],
                        datePrep: data['datePrep'],
                        buyer: data['buyer'],
                        invoiceNumber: data['invoiceNumber'],
                        paymentMethod: data['paymentMethod'],
                        paymentDate: data['paymentDate'],
                        bankAccount: data['bankAccount'],
                        invoiceItems: data['invoiceItems'],
                        amount: data['amount'],
                        paid: data['paid'],
                        paidValue: data['paidValue'],
                        paidLeft: data['paidLeft'],
                    };
                    break;
                case 'intproof':
                    break;
                case 'economicOperation':

                    break;
                default:
                    throw new Error(`Unknown entity in Helper.populate() function`);
            }
        }
        return object;
    }

    static parseEntity(entity, data) {
        if (!data) {
            return null;
        }
        let parsed = {
            id: data['id'] ? data['id'] : null,
        };
        switch (entity) {
            case 'owner': {
                parsed.email = data['email'] ? data['email'] : null;
                parsed.firstName = data['firstName'] ? data['firstName'] : null;
                parsed.lastName = data['lastName'] ? data['lastName'] : null;
                parsed.avatar = data['avatar'] ? data['avatar'] : null;
                break;
            }
            case 'company': {
                parsed.companyName = data['companyName'];
                parsed.partnership = data['partnership'];
                parsed.isPartnership = data['isPartnership'];
                parsed.street = data['street'];
                parsed.house = data['house'];
                parsed.appartment = data['appartment'];
                parsed.postalCode = data['postalCode'];
                parsed.city = data['city'];
                parsed.nip = data['nip'];
                parsed.regon = data['regon'];
                parsed.foundingDate = data['foundingDate'];
                parsed.logo = data['logo'];
                const bankAccounts = [];
                for (let key in data['bankAccounts']) {
                    if (data['bankAccounts'].hasOwnProperty(key)) {
                        bankAccounts.push(Helper.parseEntity('bankAccount', data['bankAccounts'][key]));
                    }
                }
                parsed.bankAccounts = bankAccounts;

                break;
            }
            case 'bankAccount': {
                parsed.bankAccountName = data['bankAccountName'];
                parsed.bankName = data['bankName'];
                parsed.accountNumber = data['accountNumber'];
                parsed.isDefault = data['isDefault'];
                break;
            }
            case 'book': {
                parsed.year = data['year'];
                parsed.col7 = data['col7'] ? data['col7'] : null;
                parsed.col8 = data['col8'] ? data['col8'] : null;
                parsed.col9 = data['col9'] ? data['col9'] : null;
                parsed.col10 = data['col10'] ? data['col10'] : null;
                parsed.col11 = data['col11'] ? data['col11'] : null;
                parsed.col12 = data['col12'] ? data['col12'] : null;
                parsed.col13 = data['col13'] ? data['col13'] : null;
                parsed.col14 = data['col14'] ? data['col14'] : null;
                parsed.col15 = data['col15'] ? data['col15'] : null;
                parsed.col16b = data['col16b'] ? data['col16b'] : null;
                parsed.z1 = data['z1'] ? data['z1'] : null;
                parsed.z2a = data['z2a'] ? data['z2a'] : null;
                parsed.z2b = data['z2b'] ? data['z2b'] : null;
                parsed.z2c = data['z2c'] ? data['z2c'] : null;
                parsed.z2d = data['z2d'] ? data['z2d'] : null;
                parsed.z2e = data['z2e'] ? data['z2e'] : null;
                parsed.z2f = data['z2f'] ? data['z2f'] : null;
                parsed.z2 = data['z2'] ? data['z2'] : null;
                parsed.z3 = data['z3'] ? data['z3'] : null;
                break;
            }
            case 'settlement': {
                parsed.settlementDate = data['settlementDate'];
                parsed.documents = data['documents'];
                parsed.income = data['income'] ? data['income'] : null;
                parsed.incomeCumulative = data['incomeCumulative'] ? data['incomeCumulative'] : null;
                parsed.costs = data['costs'] ? data['costs'] : null;
                parsed.costsCumulative = data['costsCumulative'] ? data['costsCumulative'] : null;
                parsed.profit = data['profit'] ? data['profit'] : null;
                parsed.profitCumulative = data['profitCumulative'] ? data['profitCumulative'] : null;
                parsed.social = data['social'] ? data['social'] : null;
                parsed.socialCumulative = data['socialCumulative'] ? data['socialCumulative'] : null;
                parsed.socialDeduction = data['socialDeduction'] ? data['socialDeduction'] : null;
                parsed.health = data['health'] ? data['health'] : null;
                parsed.healthCumulative = data['healthCumulative'] ? data['healthCumulative'] : null;
                parsed.healthDeduction = data['healthDeduction'] ? data['healthDeduction'] : null;
                parsed.taxBase = data['taxBase'] ? data['taxBase'] : null;
                parsed.tax = data['tax'] ? data['tax'] : null;
                parsed.taxCumulative = data['taxCumulative'] ? data['taxCumulative'] : null;
                parsed.closed = data['closed'] ? data['closed'] : null;
                if (data['book']) {
                    parsed.book = Helper.parseEntity('book', data['book']);
                }
                break;
            }
            case 'document': {
                parsed.type = data['type'];
                // parsed.invoice = Helper.parseEntity('invoice', data['invoice']);
                // parsed.intproof = Helper.parseEntity('intproof', data['intproof']);
                parsed.col1 = data['col1'];
                parsed.col2 = data['col2'];
                parsed.col3 = data['col3'];
                parsed.col4 = data['col4'];
                parsed.col5 = data['col5'];
                parsed.col6 = Helper.parseEntity('economicEvent', data['col6']);
                parsed.col7 = data['col7'];
                parsed.col7Penny = data['col7Penny'];
                parsed.col8 = data['col8'];
                parsed.col8Penny = data['col8Penny'];
                parsed.col9 = data['col9'];
                parsed.col9Penny = data['col9Penny'];
                parsed.col10 = data['col10'];
                parsed.col10Penny = data['col10Penny'];
                parsed.col11 = data['col11'];
                parsed.col11Penny = data['col11Penny'];
                parsed.col12 = data['col12'];
                parsed.col12Penny = data['col12Penny'];
                parsed.col13 = data['col13'];
                parsed.col13Penny = data['col13Penny'];
                parsed.col14 = data['col14'];
                parsed.col14Penny = data['col14Penny'];
                parsed.col15 = data['col15'];
                parsed.col15Penny = data['col15Penny'];
                parsed.col16a = data['col16a'];
                parsed.col16b = data['col16b'];
                parsed.col16bPenny = data['col16bPenny'];
                parsed.col17 = data['col17'];
                if (data['settlement']) {
                    parsed.settlement = Helper.parseEntity('settlement', data['settlement']);
                }
                break;
            }
            case 'invoice': {
                parsed.city = data['city'];
                parsed.datePrep = data['datePrep'];
                parsed.buyer = data['buyer'];
                parsed.invoiceNumber = data['invoiceNumber'];
                parsed.paymentMethod = data['paymentMethod'];
                parsed.paymentDate = data['paymentDate'];
                parsed.bankAccount = data['bankAccount'];
                const items = [];
                for (let key in data['invoiceItems']) {
                    if (data['invoiceItems'].hasOwnProperty(key)) {
                        items.push(Helper.parseEntity('invoiceItem', data['invoiceItems'][key]));
                    }
                }
                parsed.invoiceItems = items;
                parsed.amount = data['amount'];
                parsed.amountPenny = data['amountPenny'];
                parsed.paidValue = data['paidValue'];
                parsed.paidValuePenny = data['paidValuePenny'];
                parsed.paidLeft = data['paidLeft'];
                parsed.paidLeftPenny = data['paidLeftPenny'];
                parsed.economicEvent = Helper.parseEntity('economicEvent', data['economicEvent']);
                break;
            }
            case 'invoiceItem': {
                parsed.pos = data['pos'];
                parsed.title = data['title'];
                parsed.unit = data['unit'];
                parsed.unitCount = data['unitCount'];
                parsed.unitPrice = data['unitPrice'];
                parsed.unitPricePenny = data['unitPricePenny'];
                parsed.legalBasis = data['legalBasis'];
                parsed.price = data['price'];
                parsed.pricePenny = data['pricePenny'];
                parsed.economicOperation = Helper.parseEntity('economicOperation', data['economicOperation']);
                break;
            }
            case 'intproof': {
                parsed.city = data['city'];
                parsed.datePrep = data['datePrep'];
                parsed.proofNumber = data['proofNumber'];
                const items = [];
                for (let key in data['intproofItems']) {
                    if (data['intproofItems'].hasOwnProperty(key)) {
                        items.push(Helper.parseEntity('intproofItem', data['intproofItems'][key]));
                    }
                }
                parsed.intproofItems = items;
                parsed.amount = data['amount'];
                parsed.amountPenny = data['amountPenny'];
                parsed.economicEvent = Helper.parseEntity('economicEvent', data['economicEvent']);
                break;
            }
            case 'intproofItem': {
                parsed.pos = data['pos'];
                parsed.title = data['title'];
                parsed.genus = data['genus'];
                parsed.documentType = data['documentType'];
                parsed.documentNumber = data['documentNumber'];
                parsed.documentDate = data['documentDate'];
                parsed.unit = data['unit'];
                parsed.unitCount = data['unitCount'];
                parsed.unitPrice = data['unitPrice'];
                parsed.unitPricePenny = data['unitPricePenny'];
                parsed.price = data['price'];
                parsed.pricePenny = data['pricePenny'];
                parsed.economicOperation = Helper.parseEntity('economicOperation', data['economicOperation']);
                break;
            }
            case 'economicEvent': {
                parsed.type = data['type'];
                parsed.description = data['description'];
                const economicOperations = [];
                for (let key in data['economicOperations']) {
                    if (data['economicOperations'].hasOwnProperty(key)) {
                        economicOperations.push(Helper.parseEntity('economicOperation', data['economicOperations'][key]));
                    }
                }
                parsed.economicOperations = economicOperations;
                // parsed.company = parseEntity('company', data['company']);
                break;
            }
            case 'economicOperation': {
                // parsed.economicEvent = data['economicEvent']['id'];
                parsed.type = data['type'];
                parsed.description = data['description'];
                parsed.bookColumn = data['bookColumn'];
                parsed.isPeriodic = data['isPeriodic'];
                parsed.period = data['period'];
                parsed.title = data['title'];
                break;
            }
            default:
                throw new Error(`Unknown entity in Helper.populate() function`);
        }
        return parsed;
    }


    /**
     * Returns React.Fragment component with formatted vignette for invoice by company data
     *
     * @param data
     * @returns {string|*}
     * @private
     */
    static printVignette(data) {
        return (data && data.nip) && (
            <React.Fragment>
                <b>{data.companyName}{data.isPartnership ? ' ' + Helper.parseSuffix(data.partnership) : ''}</b><br/>
                {data.street} {data.house}{data.appartment && '/' + data.appartment}<br/>
                {data.postalCode} {data.city}<br/>
                NIP: {data.nip}
            </React.Fragment>
        )
    }

    /**
     * Zwraca przeparsowane dane adresowe do jednolinijkowego stringa
     *
     * @param data
     * @param target
     * @returns {string}
     */
    static parseAddress(data, target = 'kpir') {
        if (data) {
            if (target === 'vignette') {
                return `${data.street} ${data.house}${data.appartment && '/' + data.appartment}<br/>
${data.postalCode} ${data.city}<br/>`;
            } else {
                return `${data.street} ${data.house}${data.appartment && '/' + data.appartment}; ${data.postalCode} ${data.city}`;
            }
        }
        return '';
    }

    static parseSuffix(suffixValue) {
        const suffixes = {
            zoo: 'Sp. z o.o.',
            sa: 'S.A.',
        };
        return suffixes[suffixValue];
    }

    static fullName(company) {
        return company.companyName + (company.isPartnership ? ' ' + Helper.parseSuffix(company.partnership) : '');
    }

// static prepareInvoiceNumber(contractor) {
//     const currentDate = new Date();
//     const no = parent.api.entity.documents.reduce((total, document) => total + (document['col4'] === fullName(contractor) ? 1 : 0), 1);
//     return `${contractor.shortcut}/${currentDate.getFullYear()}/${currentDate.getMonth()}/${no}`;
// }

    static formatItemTitle(operation, date) {
        if (operation) {
            const title = ['description', 'title', 'period'].map(field => {
                let result;
                if (field === 'description') {
                    return operation['description']
                }
                if (!operation['isPeriodic']) {
                    return '';
                }

                if (operation[field] !== '' && operation[field] !== null) {
                    result = field !== 'period' ? ' ' + operation[field] : ' - ' +
                        Helper.formatPeriod(operation[field], date)
                    ;
                } else {
                    result = '';
                }

                return result;
            });
            return typeof (title) === 'string' ? title : title.join('');
        } else {
            return '';
        }
    }

    /**
     * Returns json formatted options {value, text} from array where value=array['id'], text=array[fieldName]
     *
     * @param fieldName - field name
     * @param data - value of field
     * @param withNoSelect - add choose option on start
     * @param conditions - conditions to find element
     * @param mergeFields - fields to merge in select view
     * @returns {*[]|*}
     * @private
     */
    static formatOptions(fieldName, data, withNoSelect = true, conditions = [], mergeFields = []) {
        if (data && data.length > 0) {
            if (withNoSelect) {
                return [
                    {value: '', text: data.length === 0 ? `Brak opcji` : `Wybierz`},
                    ...data.filter(option => {
                        let condition = true;
                        for (let key in conditions) {
                            if (conditions.hasOwnProperty(key)) {
                                if (option[key] !== conditions[key]) {
                                    condition = false;
                                }
                            }
                        }
                        return condition;
                    }).map(option => {
                        const text = mergeFields.map(field => {
                            let ret;

                            if (option[field] !== '' && option[field] !== null) {
                                ret = (field !== 'period' ? ' ' : ' - ') + option[field];
                            } else {
                                ret = '';
                            }
                            return ret;
                        });
                        let optionValue = '';
                        if (fieldName === 'companyName') {
                            optionValue = option[fieldName] + (option['isPartnership'] ? ' ' + Helper.parseSuffix(option['partnership']) : '');
                        } else {
                            optionValue = option[fieldName] + (option[fieldName] !== text ? (typeof (text) == 'string' ? text : text.join('')) : '')
                        }
                        return {
                            value: option['id'],
                            text: optionValue,
                        };
                    }),
                ];
            } else {
                return data.map(option => {
                    const text = option[fieldName] + mergeFields.map(field => {
                        let ret;

                        if (option[field] !== '' && option[field] !== null) {
                            ret = (field !== 'period' ? ' ' : ' - ') + option[field];
                        } else {
                            ret = '';
                        }
                        return ret;
                    });

                    let optionValue = '';
                    if (fieldName === 'companyName') {
                        optionValue = option[fieldName] + (option['isPartnership'] ? ' ' + Helper.parseSuffix(option['partnership']) : '');
                    } else {
                        optionValue = option[fieldName] + (option[fieldName] !== text ? (typeof (text) == 'string' ? text : text.join('')) : '');
                    }
                    return {
                        value: option['id'],
                        text: optionValue,
                    }
                });
            }
        }
        return [
            {value: '', text: `Brak opcji`},
        ];
    }

    /**
     * Return array element by value of id attribute
     *
     * @param id
     * @param array
     * @param childFieldName - name of field to find index by id its child
     * @returns {*}
     * @returns {null|*}
     */
    static getArrayElementById(id, array, childFieldName = null) {
        if (id) {
            if (childFieldName !== null) {
                for (let key in array) {
                    if (array.hasOwnProperty(key) && array[key][childFieldName] && array[key][childFieldName]['id'] === id) {
                        return array[key];
                    }
                }
            } else {
                const index = Helper.getIndexOfValue('id', id, array);
                return index !== -1 ? array[index] : null;
            }
        } else {
            return null;
        }
    }

    static getIndexOfElementArrayById(id, array) {
        // console.group('getIndexOfElementArrayById');
        // console.log(id, array);
        // console.groupEnd();
        if (id && array.length > 0) {
            for (let key in array) {
                if (array.hasOwnProperty(key)) {
                    if (parseInt(id) === array[key]['id']) {
                        return key;
                    }
                }
            }
        } else {
            return null;
        }
    }

    static getIndexOfValue(fieldName, fieldValue, array) {
        return array.findIndex(item => String(item[fieldName]) === String(fieldValue));
    }

    static getIndexOfField(fieldName, fieldValue, array) {
        return array.findIndex(item => String(item[fieldName]) === String(fieldValue));
    }

    /**
     * Return element of {array} by {fieldValue} of field {fieldName}
     *
     * @param fieldName
     * @param fieldValue
     * @param array
     * @returns {*}
     */
    static findArrayElementByFieldValue(fieldName, fieldValue, array) {
        const index = Helper.getIndexOfValue(fieldName, fieldValue, array);
        return index !== -1 ? array[index] : null;
    }

    /**
     * Wyszukuje instancję w tablicy instancji na podstawie daty bez względu w jakiej formie jest ona podana
     *
     * @param fieldName
     * @param date
     * @param array
     * @returns {null|*}
     */
    static findArrayElementByFieldDate(fieldName, date, array) {
        if (date) {
            for (let key in array) {
                if (array.hasOwnProperty(key)) {
                    if (array[key][fieldName]) {
                        let fieldDate = array[key][fieldName];

                        const isBackendDate = !!fieldDate.date;
                        if (isBackendDate) {
                            fieldDate = new Date(fieldDate.date);
                            // const backendDate = isBackendDate && !isNaN(Date.parse(fieldDate.date));
                        }
                        if (typeof date.getMonth === 'undefined') {
                            date = new Date(date);
                        }
                        if (typeof fieldDate.getMonth === 'undefined') {
                            fieldDate = new Date(fieldDate);
                        }
                        if (!isNaN(fieldDate.getMonth()) &&
                            date.getFullYear() ===
                            fieldDate.getFullYear()
                            && date.getMonth() === fieldDate.getMonth()
                            && date.getDate() === fieldDate.getDate()
                        ) {
                            return array[key];
                        }
                    }
                }
            }
        }
        return null;
    }

    static formatPeriod(period, date) {
        return Helper.formatDate(date, 'invoicePeriod' + period)
    }

    static stringifyDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    /**
     * Formatuje datę do użycia w kontrolkach
     *
     * @param date
     * @param type
     * @param changeYear
     * @param changeMonth
     * @returns {string|number}
     */
    static formatDate(date, type, changeYear = 0, changeMonth = 0) {
        if (!date) {
            return '';
        }

        const monthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
            "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień",
        ];
        const quarterNames = ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"];
        let incrementing = 0;
        if (date && date.date) {
            incrementing = 1;
            date = new Date(date.date);
        }
        if (typeof date === 'string') {
            date = new Date(date);
        }
        const month = date.getMonth() + changeMonth;
        const resultDate = {
            year: date.getFullYear() + changeYear,
            month: month,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            current: (new Date(
                date.getFullYear() + changeYear,
                month,
                date.getDate() + incrementing,
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            )).toISOString().slice(0, 10),
            firstDayMonth: (new Date(
                date.getFullYear() + changeYear,
                month,
                1 + incrementing,
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            )).toISOString().slice(0, 10),
            lastDayMonth: new Date(
                date.getFullYear() + changeYear,
                month + 1,
                incrementing,
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ).toISOString().slice(0, 10),
        };

        switch (type) {
            case 'bookYear':
                return resultDate.year;
            case 'settlementPeriod':
                return monthNames[resultDate.month] + ' ' + resultDate.year;
            case 'invoicePeriodMonth':
                return monthNames[resultDate.month];
            case 'invoicePeriodQuarter':
                return quarterNames[Math.floor(resultDate.month / 3) - 1];
            case 'invoicePeriodYear':
                return resultDate.year;
            case 'settlementDate':
            case 'navigationDate':
                return resultDate.lastDayMonth;
            default:
                return resultDate.current;
        }

    }

    const
    actions = [
        {action: 'companies', entity: 'company', collection: 'companies'},
        {action: 'bank_accounts', entity: 'bankAccount', collection: 'bankAccounts'},
        {action: 'contractors', entity: 'contractor', collection: 'contractors'},
        {action: 'books', entity: 'book', collection: 'books'},
        {action: 'settlements', entity: 'settlement', collection: 'settlements'},
        {action: 'documents', entity: 'document', collection: 'documents'},
        {action: 'invoices', entity: 'invoice', collection: 'invoices'},
        {action: 'invoice_items', entity: 'invoiceItem', collection: 'invoiceItems'},
        {action: 'intproofs', entity: 'intproof', collection: 'intproofs'},
        {action: 'intproof_items', entity: 'intproofItem', collection: 'intproofs'},
        {action: 'economic_events', entity: 'economicEvent', collection: 'economicEvents'},
        {action: 'economic_operations', entity: 'economicOperation', collection: 'economicOperations'},
    ];

    static actionsEntity(actionName) {
        console.log(actionName);
        return Helper.actions[Helper.actions.findIndex(item => item.action === actionName)].entity;
    }

    static entitysAction(entityName) {
        return Helper.actions[Helper.actions.findIndex(item => item.entity === entityName)].action;
    }

    static entitysCollection(entityName) {
        return Helper.actions[Helper.actions.findIndex(item => item.entity === entityName)].collection;
    }

    static _handleComaUnitPrice(e) {
        if (e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 110) {
            e.preventDefault();
            const nextInput = document.getElementsByName(`${e.currentTarget.name}Penny`).item(0);
            nextInput.focus();
            nextInput.setSelectionRange(0, nextInput.value.length);
        }
    }

    static comparePenny(document, col, showAsObject = false) {
        if (document[col] === null) {
            return '';
        }
        const unit = document[col]['unit'];
        const penny = document[col]['penny'] !== null && document[col]['penny'] !== '' ? document[col]['penny'].toString().padStart(2, '0') : '00';
        const value = parseInt(`${unit}${penny}`);
        const float = value / 100;
        if (showAsObject) {
            return {
                unit: unit,
                penny: penny,
            }
        } else {
            return Number.parseFloat(float.toString()).toFixed(2);
        }
    }

    static sumColumn(settlements, col) {
        const sum = settlements.reduce((total, settlement) => {
            return total + parseFloat(Helper.comparePenny(settlement, 'col' + col));
        }, 0);
        return parseFloat(sum).toFixed(2);
    }
}