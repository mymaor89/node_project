const functions = require('./jest_tutorial');

test('adds 2+2 to equal 4', ()=> {
    expect(functions.add(2,2)).toBe(4);
});