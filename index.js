'use strict';

function flattenNodeGenerator(node, parent, index, flattenPropertyKey, settings, stack) {
    return function flattenNode(list) {
        node = settings.initNode(node);
        node.id = settings.generateUniqueId();
        list.push(node);
        if (node[flattenPropertyKey]) {
            for (var i = 0, len = node[flattenPropertyKey].length; i < len; i++) {
                stack.push(flattenNodeGenerator(node[flattenPropertyKey][i], node, i, flattenPropertyKey, settings, stack));
            }
        }
        if (parent && parent[flattenPropertyKey]) {
            parent[flattenPropertyKey][index] = node.id;
        }
        return list;
    }
}

module.exports = function (tree, flattenPropertyKey, options) {
    var list = [];
    var stack = [];
    var settings = {
        initNode: options.initNode || function (node) {
            return node;
        },
        uniqueIdStart: options.uniqueIdStart || 1,
        generateUniqueId: options.generateUniqueId || function () {
            return settings.uniqueIdStart++;
        }
    };
    for (var i = 0, len = tree.length; i < len; i++) {
        stack.push(flattenNodeGenerator(
            tree[i], 'root', i, flattenPropertyKey, settings, stack
        ));
    }
    while (stack.length) list = stack.shift()(list);
    return list;
};
