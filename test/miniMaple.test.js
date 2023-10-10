import {MiniMaple} from "../src/miniMaple";
import {Term} from "../src/Term";

describe('MiniMaple', () => {
  it('should split terms correctly for a positive expression', () => {
    const expression = '2*x^3-3*x^2+4*x';
    const miniMaple = new MiniMaple(expression);
    const terms = miniMaple.splitTerms();
    
    expect(terms).toEqual([
      new Term('+', 2, 'x', 3),
      new Term('-', 3, 'x', 2),
      new Term('+', 4, 'x', 1),
    ]);
  });

  it('should split terms correctly for a mixed expression', () => {
    const expression = '2*x^(-3)-3*x^2+4*x';
    const miniMaple = new MiniMaple(expression);
    const terms = miniMaple.splitTerms();
    
    const termStrings = terms.map(term => term.toString());
    
    expect(termStrings).toEqual([
      '+2*x^(-3)',
      '-3*x^2',
      '+4*x',
    ]);
  });

  it('should handle terms with no coefficients', () => {
    const expression = '+x^3-2*x^2+x';
    const miniMaple = new MiniMaple(expression);
    const terms = miniMaple.splitTerms();
    
    const termStrings = terms.map(term => term.toString());
    
    expect(termStrings).toEqual([
      '+x^3',
      '-2*x^2',
      '+x',
    ]);
  });

  it('should handle terms with no exponents', () => {
    const expression = '2*x-3*y+4';
    const miniMaple = new MiniMaple(expression);
    const terms = miniMaple.splitTerms();
    
    const termStrings = terms.map(term => term.toString());
    
    expect(termStrings).toEqual([
      '+2*x',
      '-3*y',
      '+4',
    ]);
  });

});