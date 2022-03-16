const date_check = require('./quizModule');
const csv = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";

test('should output number of finnish month', () => {
    const date = date_check.date_check("25. tammikuuta 2022  05:10",csv);
    date_list = [date.getUTCFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    //expect(date_format).toBe("Tue Jan 25 2022 05:10:00 GMT+0200 (Eastern European Standard Time)");
    //expect(date_format).toBe("2022-01-25T03:10:00.000Z");
    expect(date_list).toStrictEqual([2022, 0, 25, 5, 10, 0]);

});