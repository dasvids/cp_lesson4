import {MiniMaple} from "../src/miniMaple";

describe('MiniMaple', () => {
    it('should differentiate 4*x^3 with respect to x', () => {
      const maple = new MiniMaple('4*x^3');
      const result = maple.differentiate('x');
      expect(result).toBe('12*x^2');
    });
  
    it('should differentiate 4*x^3 with respect to y (a non-existent variable)', () => {
      const maple = new MiniMaple('4*x^3');
      const result = maple.differentiate('y');
      expect(result).toBe('0');
    });
  
    it('should differentiate 4*x^3-x^2 with respect to x', () => {
      const maple = new MiniMaple('4*x^3-x^2');
      const result = maple.differentiate('x').toString();
      expect(result).toBe('12*x^2-2*x');
    });
  
    it('should handle invalid input', () => {
      const maple = new MiniMaple('4*x^3+sin(x)');
      expect(() => maple.differentiate('x')).toThrowError(/Invalid expression/);
    });

    
  });