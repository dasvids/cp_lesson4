import {Term} from "../src/Term.js";

describe('Term', () => {
    it('should differentiate 4*x^3 with respect to x', () => {
        const term = new Term("4*x^3","+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('12*x^2');
    });

    it('should differentiate -4*x^3 with respect to x', () => {
        const term = new Term("4*x^3","-");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-12*x^2');
    });

    it('should differentiate 4*x^-3 with respect to x', () => {
        const term = new Term("4*x^-3","+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-12*x^-4');
    });

    it('should differentiate -4*x^-3 with respect to x', () => {
        const term = new Term("4*x^-3","-");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('12*x^-4');
    });

    it('should differentiate -4*x^-3 with respect to x', () => {
        const term = new Term("4*x^-3","-");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('12*x^-4');
    });

    it('should differentiate x^2 with respect to x', () => {
        const term = new Term("x^2","+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('2*x');
    });

    it('should differentiate -x^2 with respect to x', () => {
        const term = new Term("x^2","-");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-2*x');
    });

    it('should differentiate -x^2 with respect to x', () => {
        const term = new Term("x^-2","+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-2*x^-3');
    });

    it('should differentiate a constant term', () => {
        const term = new Term("5", "+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('0');
    });

    it('should differentiate a term without a coefficient', () => {
        const term = new Term("x^3", "+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('3*x^2');
    });

    it('should differentiate a term with a negative coefficient', () => {
        const term = new Term("-2*x^2", "+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-4*x');
    });

    it('should differentiate a term with a coefficient and negative power', () => {
        const term = new Term("4*x^-3", "+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('-12*x^-4');
    });

    it('should differentiate a term with a coefficient and positive power', () => {
        const term = new Term("2*x^5", "+");
        const result = term.differentiate('x');
        expect(result.toString()).toBe('10*x^4');
    });

});