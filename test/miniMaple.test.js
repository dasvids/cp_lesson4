import {MiniMaple} from "../src/miniMaple";

describe('MiniMaple', () => {
  it('should validate a valid expression', () => {
    const validExpression = '2*x^3-3*x^2+4*x-1';
    const maple = new MiniMaple(validExpression);
    expect(maple.isValidExpression()).toBe(true);
  });

  it('should invalidate an invalid expression', () => {
    const invalidExpression = '2*x^3-3x^2+4*x-1'; // Missing '*' in '3x^2'
    const maple = new MiniMaple(invalidExpression);
    expect(maple.isValidExpression()).toBe(false);
  });

  it('should split terms correctly', () => {
    const expression = '2*x^3-3*x^2+4*x-1';
    const maple = new MiniMaple(expression);
    const terms = maple.splitTerms();
    expect(terms).toHaveLength(4);
    expect(terms[0].toString()).toBe('+2x^3');
    expect(terms[1].toString()).toBe('-3x^2');
    expect(terms[2].toString()).toBe('+4x');
    expect(terms[3].toString()).toBe('-1');
  });

  it('should differentiate correctly', () => {
    const expression = '2*x^3-3*x^2+4*x-1';
    const maple = new MiniMaple(expression);
    const variable = 'x';
    const derivative = maple.differentiate(variable);
    expect(derivative).toBe('+6x^2-6x+4');
  });

  it('should differentiate with respect to another variable', () => {
    const expression = '2*y^3-3*y^2+4*y-1';
    const maple = new MiniMaple(expression);
    const variable = 'x'; // Differentiating with respect to 'x' in a 'y' expression
    const derivative = maple.differentiate(variable);
    expect(derivative).toBe('0');
  });
});