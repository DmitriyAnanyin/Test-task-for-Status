var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.items = items.reduce(function (acc, item) {
            acc[item.id] = item;
            return acc;
        }, {});
    }
    TreeStore.prototype.getAll = function () {
        var allItems = [];
        for (var key in this.items) {
            allItems.push(this.items[key]);
        }
        return allItems;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.items[id];
    };
    TreeStore.prototype.getChildren = function (id) {
        var childrenItems = [];
        for (var key in this.items) {
            var item = this.items[key];
            if (item.parent !== id)
                continue;
            childrenItems.push(item);
        }
        return childrenItems;
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var childrenItems = [];
        var parentWithChildrenKeys = this.getParentWithChildrenKeys();
        var keysIndexs = Object.keys(parentWithChildrenKeys);
        var level = id;
        for (var i = 0; i < keysIndexs.length; i++) {
            var parentKey = keysIndexs[i];
            if (parentKey < level || parentKey != level)
                continue;
            for (var index in parentWithChildrenKeys[parentKey]) {
                var itemId = parentWithChildrenKeys[parentKey][index];
                childrenItems.push(this.items[itemId]);
            }
            var nextParentKey = keysIndexs[i + 1];
            if (!parentWithChildrenKeys[parentKey].includes(nextParentKey)) {
                break;
            }
            level = nextParentKey;
        }
        return childrenItems;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var parentItems = [];
        var parentWithChildrenKeys = this.getParentWithChildrenKeys();
        var keysIndexs = Object.keys(parentWithChildrenKeys);
        parentItems.push(this.items[id]);
        var level = id;
        for (var i = keysIndexs.length - 1; i >= 0; i--) {
            var nextChildrenKey = keysIndexs[i - 1];
            if (!parentWithChildrenKeys[nextChildrenKey])
                continue;
            if (parentWithChildrenKeys[nextChildrenKey].includes(level.toString())) {
                parentItems.push(this.items[nextChildrenKey]);
                level = nextChildrenKey;
            }
        }
        return parentItems;
    };
    TreeStore.prototype.getParentWithChildrenKeys = function () {
        var parentWithChildrenKeys = {};
        for (var key in this.items) {
            var item = this.items[key];
            if (!parentWithChildrenKeys[item.parent]) {
                parentWithChildrenKeys[item.parent] = [];
            }
            parentWithChildrenKeys[item.parent].push(key);
        }
        return parentWithChildrenKeys;
    };
    return TreeStore;
}());
module.exports = TreeStore;
