import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Suite de ejemplo', () => {
  test('debe sumar dos números correctamente', () => {
    const result = 2 + 2;
    assert.strictEqual(result, 4);
  });

  test('debe manejar operaciones asíncronas', async () => {
    const asyncOperation = () => Promise.resolve('success');
    const result = await asyncOperation();
    assert.strictEqual(result, 'success');
  });

  test('debe validar arrays', () => {
    const array = [1, 2, 3];
    assert.deepStrictEqual(array, [1, 2, 3]);
    assert.ok(array.includes(2));
  });

  test('debe manejar errores', () => {
    const throwError = () => {
      throw new Error('Error intencional');
    };

    assert.throws(throwError, Error);
  });
});

describe('Tests con setup', () => {
  let testData;

  test('setup antes del test', () => {
    testData = { value: 42 };
    assert.ok(testData);
  });

  test('usa los datos del setup', () => {
    assert.strictEqual(testData.value, 42);
  });
});
