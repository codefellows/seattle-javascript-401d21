'use strict';

describe('Showcasing basic TDD with JEST', () => {
  test('Different ways to use the expect function',() => {
    let aNumber = 5;
    expect(aNumber).toEqual(5);

    let aNullvalue = null;
    expect(aNullvalue).toBeNull();

    let fifty = 50;
    expect(fifty).toBeLessThan(100);
    expect(fifty).toBeGreaterThan(25);
    expect(fifty).toBeGreaterThanOrEqual(50);

  });

  test('Different ways to use the expect function with Falsy/Truthy values',() => {
    let aTruthyValue = 'hi';
    expect(aTruthyValue).toBeTruthy();

    let aFalsyValue = 0;
    expect(aFalsyValue).toBeFalsy();
    expect(aFalsyValue).not.toBeTruthy();
  });
});