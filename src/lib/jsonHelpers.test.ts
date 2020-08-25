import { snakeToCamel } from './jsonHelpers';

describe('snakeToCamel()', () => {
  it('Converts snake case to camel case', () => {
    const snakeObject = { test_snake: 'test'};
    const result = snakeToCamel(snakeObject);
    
    expect(result).toHaveProperty('testSnake');
  });
});
