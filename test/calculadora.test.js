const test = require("node:test");
const assert = require("node:assert/strict");
const calculadora = require("../src/calculadora");

test("operações básicas e avançadas", () => {
  assert.equal(calculadora.somar(2, 3), 5);
  assert.equal(calculadora.subtrair(7, 4), 3);
  assert.equal(calculadora.multiplicar(6, 5), 30);
  assert.equal(calculadora.dividir(15, 3), 5);
  assert.equal(calculadora.potencia(2, 5), 32);
  assert.equal(calculadora.raizQuadrada(81), 9);
  assert.equal(calculadora.porcentagem(250, 12), 30);
});

test("divisão por zero lança erro", () => {
  assert.throws(() => calculadora.dividir(10, 0), /Divisão por zero/);
});

test("calcula expressão com precedência e parênteses", () => {
  assert.equal(calculadora.calcularExpressao("2 + 3 * (4 + 1)"), 17);
  assert.equal(calculadora.calcularExpressao("2 ^ 3 ^ 2"), 512);
});

test("suporta números negativos em expressões", () => {
  assert.equal(calculadora.calcularExpressao("-5 + 3"), -2);
  assert.equal(calculadora.calcularExpressao("4 * -2"), -8);
});

test("expressão inválida lança erro", () => {
  assert.throws(() => calculadora.calcularExpressao("2 +"), /Expressão inválida/);
  assert.throws(() => calculadora.calcularExpressao("2 + abc"), /Expressão inválida/);
});
