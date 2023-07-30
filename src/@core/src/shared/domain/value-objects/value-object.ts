import { deepFreeze } from '../utils/object';

export abstract class ValueObject<Value = any> {
    protected readonly _value: Value;

    constructor(value: Value) {
        this._value = deepFreeze(value);
    }
    get value() {
        return this._value;
    }

    //** Criando o toString como arrow function ele sobrescreve o prototype to nodejs do metodo to string normal */
    toString = () => {
        // return this.value;

        if (typeof this.value !== 'object' || this.value === null) {
            try {
                return this.value.toString();
            } catch (e) {
                return this.value + '';
            }
        }

        const valueStr = this.value.toString();
        return valueStr === '[object Object]'
            ? JSON.stringify(this.value)
            : valueStr;
    };
}
