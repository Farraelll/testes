const operators = {
  "+": { precedence: 1, associativity: "left", evaluate: (a, b) => a + b },
  "-": { precedence: 1, associativity: "left", evaluate: (a, b) => a - b },
  "*": { precedence: 2, associativity: "left", evaluate: (a, b) => a * b },
  "/": {
    precedence: 2,
    associativity: "left",
    evaluate: (a, b) => {
      if (b === 0) {
        throw new Error("Divisão por zero não é permitida.");
      }
      return a / b;
    }
  },
  "^": { precedence: 3, associativity: "right", evaluate: (a, b) => a ** b }
};

function tokenize(expression) {
  const sanitized = expression.replace(/\s+/g, "");
  const tokens = [];

  for (let i = 0; i < sanitized.length; i += 1) {
    const current = sanitized[i];
    if ((current >= "0" && current <= "9") || current === ".") {
      let j = i;
      let hasDot = false;
      let hasDigit = false;

      while (j < sanitized.length) {
        const char = sanitized[j];
        if (char >= "0" && char <= "9") {
          hasDigit = true;
          j += 1;
          continue;
        }
        if (char === "." && !hasDot) {
          hasDot = true;
          j += 1;
          continue;
        }
        break;
      }

      if (!hasDigit) {
        throw new Error("Expressão inválida.");
      }

      tokens.push(sanitized.slice(i, j));
      i = j - 1;
      continue;
    }

    if (operators[current] || current === "(" || current === ")") {
      tokens.push(current);
      continue;
    }

    throw new Error("Expressão inválida.");
  }

  return tokens;
}

function isNumeric(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  let i = token[0] === "-" ? 1 : 0;
  if (i === token.length) {
    return false;
  }

  let hasDot = false;
  let hasDigit = false;

  for (; i < token.length; i += 1) {
    const char = token[i];
    if (char >= "0" && char <= "9") {
      hasDigit = true;
      continue;
    }
    if (char === "." && !hasDot) {
      hasDot = true;
      continue;
    }
    return false;
  }

  return hasDigit;
}

function toRpn(expression) {
  const tokens = tokenize(expression);
  if (!tokens.length) {
    throw new Error("Expressão inválida.");
  }

  const output = [];
  const stack = [];
  let previous = null;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (isNumeric(token)) {
      output.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack.at(-1) !== "(") {
        output.push(stack.pop());
      }
      if (stack.pop() !== "(") {
        throw new Error("Parênteses desbalanceados.");
      }
    } else if (operators[token]) {
      if (token === "-" && (previous === null || previous === "(" || operators[previous])) {
        const nextToken = tokens[i + 1];
        if (isNumeric(nextToken)) {
          output.push(String(-Number(nextToken)));
          i += 1;
          previous = nextToken;
          continue;
        }
        output.push("0");
      }

      while (stack.length) {
        const top = stack.at(-1);
        if (!operators[top]) {
          break;
        }

        const shouldPop =
          (operators[token].associativity === "left" && operators[token].precedence <= operators[top].precedence) ||
          (operators[token].associativity === "right" && operators[token].precedence < operators[top].precedence);

        if (!shouldPop) {
          break;
        }

        output.push(stack.pop());
      }

      stack.push(token);
    } else {
      throw new Error("Token inválido na expressão.");
    }

    previous = token;
  }

  while (stack.length) {
    const token = stack.pop();
    if (token === "(" || token === ")") {
      throw new Error("Parênteses desbalanceados.");
    }
    output.push(token);
  }

  return output;
}

function evaluateExpression(expression) {
  const rpn = toRpn(expression);
  const stack = [];

  for (const token of rpn) {
    if (isNumeric(token)) {
      stack.push(Number(token));
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();

    if (a === undefined || b === undefined) {
      throw new Error("Expressão inválida.");
    }

    stack.push(operators[token].evaluate(a, b));
  }

  if (stack.length !== 1) {
    throw new Error("Expressão inválida.");
  }

  return stack[0];
}

const calculadora = {
  somar: (a, b) => a + b,
  subtrair: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => {
    if (b === 0) {
      throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;
  },
  potencia: (base, expoente) => base ** expoente,
  raizQuadrada: (valor) => {
    if (valor < 0) {
      throw new Error("Não existe raiz quadrada real de número negativo.");
    }
    return Math.sqrt(valor);
  },
  porcentagem: (valor, percentual) => (valor * percentual) / 100,
  calcularExpressao: evaluateExpression
};

module.exports = calculadora;
