import {MiniMaple} from "../src/miniMaple";

test('it fails', () => {
    expect(false).toBeTruthy();
});

describe('MiniMaple', () => {
    
    it('Differentiate 4*x^3 with respect to x', () => {
        const maple = new MiniMaple('4*x^3');
        const result = maple.differentiate('x');
        expect(result).toBe('12*x^2');
    });

    it('Differentiate 4*x^3 with respect to y', () => {
        const maple = new MiniMaple('4*x^3');
        const result = maple.differentiate('y');
        expect(result).toBe('0');
      });
      
    it('Differentiate 4*x^3-x^2 with respect to x', () => {
        const maple = new MiniMaple('4*x^3-x^2');
        const result = maple.differentiate('x');
        expect(result).toBe('12*x^2-2*x');
    });
});