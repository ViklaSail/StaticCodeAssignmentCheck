const date_check = require('./quizModule');
const csv = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";

test('should output number of finnish month', () => {
    const date_format = date_check.date_check("25. tammikuuta 2022  05:10",csv);
    expect(date_format).toBe("2022, 1, 25, 5, 10, 0");
});