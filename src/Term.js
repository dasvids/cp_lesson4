class Term {
    constructor(expr, sign) {
        this.expr = expr;
        this.sign = sign;
    }

    toString() {
        if (this.sign === "+") {
            return this.expr;
        } else if (this.sign === "-") {
            return `-${this.expr}`;
        } else {
            return this.expr;
        }
    }

    differentiate(variable) {
        const [coefficient, power] = this.parseExpression(this.expr);
    
        if (this.containsVariable(this.expr, variable)) {
            let newCoefficient = coefficient * power;
            const newPower = power - 1;
            if (newCoefficient < 0) {
                newCoefficient = Math.abs(newCoefficient);
                this.sign = this.sign === '+' ? '-' : '+';
            }
            if (power === 0) {
                return new Term("0", "+"); // ну очевидно что произойдет
            }
            else if (newPower === 1) {
                return new Term(`${newCoefficient}*${variable}`, this.sign);
            } else {
                return new Term(`${newCoefficient}*${variable}^${newPower}`, this.sign);
            }
        } else {
            return new Term("0", ""); // Если переменной нет, возвращаем 0
        }
    }

    parseExpression(expr) {
        const coefficientPowerMatch = expr.match(/(-?\d*\.*\d*)(\*?)([a-zA-Z])(\^(-?\d+))?/);
        const coefficient = coefficientPowerMatch ? coefficientPowerMatch[1] || 1 : 1;
        const power = coefficientPowerMatch ? coefficientPowerMatch[5] || 1 : 1;
        return [parseFloat(coefficient), parseInt(power)];
    }

    containsVariable(expr, variable) {
        return expr.includes(variable);
    }
}
export { Term }