import { Term } from "./Term.js";

class MiniMaple {
  constructor(expression) {
    this.expression = expression;
  }
  //проверка валидности выражения
  isValidExpression() {
    const validExpressionRegex = /^[0-9a-zA-Z+\-*^()x]+$/;
    return validExpressionRegex.test(this.expression);
  }
  
  splitTerms() {
    // Разбиваем выражение на термины и создаем объекты Term
    const termRegex = /([+\-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?[a-zA-Z]*\^?-?[0-9]*)/g;
    const termStrings = this.expression.match(termRegex) || [];
    const terms = termStrings.map((termString) => {
      // Разбиваем строку термина на коэффициент, основание и степень
      const sign = termString[0] === '-' ? '-' : '+';
      const parts = termString.split('*');
      const coef = parseFloat(parts[0]);
      let base = '';
      let exponent = 0;

      for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        if (part.includes('^')) {
          const [basePart, expPart] = part.split('^');
          base = basePart;
          exponent = parseInt(expPart);
        } else {
          base = part;
        }
      }

      return new Term(sign, coef, base, exponent);
    });

    return terms;
  }

  differentiate(variable) {
    const terms = this.splitTerms();
    const derivativeTerms = [];
  
    for (const term of terms) {
      if (term.base === variable) {
        // Если основание термина совпадает с переменной, вычисляем производную.
        const newCoefficient = term.coefficient * term.exponent;
        const newExponent = term.exponent - 1;
        
        if (newExponent === 0) {
          // Если новая степень равна 0, создаем термин без степени.
          derivativeTerms.push(new Term(term.sign, newCoefficient, '', 0));
        } else {
          // В противном случае создаем термин с новой степенью.
          derivativeTerms.push(new Term(term.sign, newCoefficient, variable, newExponent));
        }
      }
    }
  
    // Собираем термины производной в одно выражение.
    const derivativeExpression = derivativeTerms.map(term => term.toString()).join('');
  
    // Если производная пуста (нет терминов), возвращаем '0'.
    return derivativeExpression !== '' ? derivativeExpression : '0';
  }
}
export { MiniMaple }