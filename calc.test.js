const mathOperations = require('./calculator');

/*describe("Calculator tests", () => {
    test('adding 1 + 2 should return 3'​, () => {
      var result = mathOperations.sum(1,2)
      expect(result).toBe(3);
    });
   }) */
test('adds 1 + 2 to equal 3', () => {
  expect(mathOperations.sum(1, 2)).toBe(3);
});   