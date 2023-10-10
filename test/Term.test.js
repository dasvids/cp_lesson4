import { Term } from "../src/Term.js";

describe('Term class', () => {
    it('should create a term with correct properties', () => {
        const term = new Term('-', 3, 'x', 2);
        expect(term.sign).toBe('-');
        expect(term.coef).toBe(3);
        expect(term.base).toBe('x');
        expect(term.exponent).toBe(2);
    });

    it('should correctly format term to string', () => {
        const term1 = new Term('+', 4, 'x', 3);
        const term2 = new Term('-', 1.5, 'y', -2);
        const term3 = new Term('-', 2, 'z', 0);

        expect(term1.toString()).toBe('+4*x^3');
        expect(term2.toString()).toBe('-1.5*y^(-2)');
        expect(term3.toString()).toBe('-2');
    });

    it('should differentiate correctly', () => {
        const term1 = new Term('+', 4, 'x', 3);
        const term2 = new Term('-', 1.5, 'x', -2);
        const term3 = new Term('-', 2, 'y', 0);

        const diff1 = term1.differentiate('x');
        const diff2 = term2.differentiate('x');
        const diff3 = term3.differentiate('y');

        expect(diff1.toString()).toBe('+12*x^2');
        expect(diff2.toString()).toBe('+3*x^(-3)');
        expect(diff3.toString()).toBe('+0');
    });

    it('should differentiate correctly with sign changes', () => {
        const term1 = new Term('-', 3, 'x', 2);
        const term2 = new Term('-', 2, 'x', 1);
        const term3 = new Term('-', 4, 'x', 0);

        const diff1 = term1.differentiate('x');
        const diff2 = term2.differentiate('x');
        const diff3 = term3.differentiate('x');

        expect(diff1.toString()).toBe('-6*x');
        expect(diff2.toString()).toBe('-2');
        expect(diff3.toString()).toBe('+0');
    });

    it('should return zero derivative when variable is different from base', () => {
        const term = new Term('-', 2, 'x', 3);
        const variable = 'y'; // Переменная, которая не совпадает с основанием

        const derivative = term.differentiate(variable);

        // Ожидаем, что производная будет нулем
        expect(derivative.toString()).toBe('+0');
    });
});