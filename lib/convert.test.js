const convert = require('./convert')


test('convert 4 and 4', () => {

    expect(convert.convert(4,4)).toBe(16)

})

test('convert 0 and 4', () => {

    expect(convert.convert(0,4)).toBe(0)

})

test('convert Tomoney Float', () => {

    expect(convert.toMoney(2)).toBe('2.00')

})

test('convert Tomoney String', () => {

    expect(convert.toMoney('2')).toBe('2.00')

})

