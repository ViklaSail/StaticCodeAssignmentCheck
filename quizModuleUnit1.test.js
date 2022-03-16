const  finnish_month_converter  = require('./quizModule');

test('should output number of finnish month', () => {
    const month_number = finnish_month_converter.finnish_month_converter("maaliskuuta");
    expect(month_number).toBe(2);
});