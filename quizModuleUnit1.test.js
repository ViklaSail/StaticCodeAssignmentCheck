const converters = require('./basic');

describe('Converters', () => { 
 test('should output number of finnish month', () => {
    const month_number = converters.conv("maaliskuu");
    expect(month_number).toBe(2);
});
})