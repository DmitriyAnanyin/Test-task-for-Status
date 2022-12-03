interface IItem {
  id: number | string;
  parent: number | string;
  type?: string | null;
}
type ID = string | number;

class TreeStore {
  readonly items: object;

  constructor(items: IItem[]) {
    this.items = items.reduce((acc, item: IItem) => {
      acc[item.id] = item;
      return acc;
    }, {});
  }

  getAll(): IItem[] {
    const allItems: IItem[] = [];

    for (let key in this.items) {
      allItems.push(this.items[key]);
    }

    return allItems;
  }

  getItem(id: ID): IItem | undefined {
    return this.items[id];
  }

  getChildren(id: ID): IItem[] {
    const childrenItems: IItem[] = [];

    for (let key in this.items) {
      const item = this.items[key];

      if (item.parent !== id) continue;

      childrenItems.push(item);
    }

    return childrenItems;
  }

  getAllChildren(id: ID): IItem[] {
    const childrenItems: IItem[] = [];

    const parentWithChildrenKeys = this.getParentWithChildrenKeys();

    const keysIndexs = Object.keys(parentWithChildrenKeys);

    let level = id;
    for (let i = 0; i < keysIndexs.length; i++) {
      const parentKey = keysIndexs[i];

      if (parentKey < level || parentKey != level) continue;

      for (let index in parentWithChildrenKeys[parentKey]) {
        const itemId = parentWithChildrenKeys[parentKey][index];

        childrenItems.push(this.items[itemId]);
      }

      const nextParentKey = keysIndexs[i + 1];
      if (!parentWithChildrenKeys[parentKey].includes(nextParentKey)) {
        break;
      }
      level = nextParentKey;
    }

    return childrenItems;
  }

  getAllParents(id: ID): IItem[] {
    const parentItems: IItem[] = [];

    const parentWithChildrenKeys = this.getParentWithChildrenKeys();

    const keysIndexs = Object.keys(parentWithChildrenKeys);

    parentItems.push(this.items[id]);

    let level = id;
    for (let i = keysIndexs.length - 1; i >= 0; i--) {
      const nextChildrenKey = keysIndexs[i - 1];

      if (!parentWithChildrenKeys[nextChildrenKey]) continue;

      if (parentWithChildrenKeys[nextChildrenKey].includes(level.toString())) {
        parentItems.push(this.items[nextChildrenKey]);
        level = nextChildrenKey;
      }
    }

    return parentItems;
  }

  getParentWithChildrenKeys() {
    const parentWithChildrenKeys = {};

    for (let key in this.items) {
      const item = this.items[key];

      if (!parentWithChildrenKeys[item.parent]) {
        parentWithChildrenKeys[item.parent] = [];
      }

      parentWithChildrenKeys[item.parent].push(key);
    }
    return parentWithChildrenKeys;
  }
}

module.exports = TreeStore;
