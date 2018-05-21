// // 相等或不相等
// expect(4 + 5).to.be.equal(9);
// expect(4 + 5).to.be.not.equal(10);
// expect(foo).to.be.deep.equal({ bar: 'baz' });

// // 布尔值为true
// expect('everthing').to.be.ok;
// expect(false).to.not.be.ok;

// // typeof
// expect('test').to.be.a('string');
// expect({ foo: 'bar' }).to.be.an('object');
// expect(foo).to.be.an.instanceof(Foo);

// // include
// expect([1, 2, 3]).to.include(2);
// expect('foobar').to.contain('foo');
// expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// // empty
// expect([]).to.be.empty;
// expect('').to.be.empty;
// expect({}).to.be.empty;

// // match
// expect('foobar').to.match(/^foo/);