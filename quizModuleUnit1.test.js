const finnishMonthConverter = require('./quizModule');

test('should output number of finnish month', () => {
    const month_number = finnishMonthConverter.finnishMonthConverter("maaliskuu");
    expect(month_number).toBe(2);
});

//https://code.visualstudio.com/docs/nodejs/nodejs-debugging