const TreeStore = require('./index');

const items = [
  { id: 1, parent: 'root' },
  { id: '2', parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: '4', parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

describe('TreeStore class', () => {
  describe('getAll Function', () => {
    test('Should return original array of data ', () => {
      expect(ts.getAll()).toStrictEqual(items);
    });
  });

  describe('getItem function', () => {
    test('Should return object by id', () => {
      expect(ts.getItem(2)).toStrictEqual({ id: '2', parent: 1, type: 'test' });
    });

    test('In the absence of an object should return undefined', () => {
      expect(ts.getItem(10)).toBe(undefined);
    });
  });

  describe('getChildren function', () => {
    test('Should return children by id', () => {
      const expectedItems = [
        { id: '2', parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
      ];
      expect(ts.getChildren(1)).toStrictEqual(expectedItems);
    });

    test('In the absence children elements should return empty array', () => {
      expect(ts.getChildren(10)).toStrictEqual([]);
    });
  });

  describe('getAllChildren function', () => {
    test('Should return children array by id + children of children elements', () => {
      const expectedItems = [
        { id: '4', parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },

        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
      ];
      expect(ts.getAllChildren(2)).toStrictEqual(expectedItems);
    });

    test('In the absence children elements should return empty array', () => {
      expect(ts.getAllChildren(10)).toStrictEqual([]);
    });
  });

  describe('getAllParent function', () => {
    test('Should return a chain of parent elements', () => {
      const expectedItems = [
        { id: 5, parent: 2, type: 'test' },
        { id: '2', parent: 1, type: 'test' },
        { id: 1, parent: 'root' },
      ];
      expect(ts.getAllParents(5)).toStrictEqual(expectedItems);
    });

    test('In the absence parent elements should return array with one element', () => {
      expect(ts.getAllParents(1)).toStrictEqual([{ id: 1, parent: 'root' }]);
    });
  });
});
