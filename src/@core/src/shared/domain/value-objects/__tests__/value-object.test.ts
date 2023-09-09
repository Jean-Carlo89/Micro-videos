import { ValueObject } from '../value-object';

//* Gerando classe stub para podr testar o value object ja que ele é abstract e nao pode ser instanciado normalmente
class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value');

        expect(vo.value).toBe('string value');

        vo = new StubValueObject({ prop1: 'string value' });
        expect(vo.value).toStrictEqual({ prop1: 'string value' });
    });

    it('should convert to string', () => {
        const date = new Date();
        let arrange = [
            // { received: null, expected: "null" },
            // { received: undefined, expected: "undefined" },
            { received: '', expected: '' },
            { received: 'fake test', expected: 'fake test' },
            { received: 0, expected: '0' },
            { received: 1, expected: '1' },
            { received: 5, expected: '5' },
            { received: true, expected: 'true' },
            { received: false, expected: 'false' },
            { received: false, expected: 'false' },
            { received: date, expected: date.toString() },
            {
                received: {
                    prop1: 'value',
                },
                expected: JSON.stringify({
                    prop1: 'value',
                }),
            },
            //   "",
            //   "fake test",
            //   0,
            //   1,
            //   5,
            //   true,
            //   false,
            //   date,
            //   {
            //     prop1: "value",
            //   },
        ];

        arrange.forEach((value) => {
            let vo = new StubValueObject(value.received);

            expect(vo.toString()).toBe(value.expected);
        });

        // let vo = new StubValueObject(null);

        // expect(vo.toString()).toBe("null");

        // vo = new StubValueObject(undefined);

        // expect(vo.toString()).toBe("undefined");
    });
});
