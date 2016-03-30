'use strict';

module.exports = function (tree, flattenPropertyKey, options) {

    var settings = {
        initNode: options.initNode || function (node) { return node; },
        uniqueIdStart: options.uniqueIdStart || 1,
        generateUniqueId: options.generateUniqueId || function () {
            return settings.uniqueIdStart++;
        }
    };

    var list = [];

    for (var i = 0, len = tree.length; i < len; i++) {
        flattenNode(tree[i]);
    }

    function flattenNode(node) {
        node = settings.initNode(node);
        node.id = settings.generateUniqueId();
        list.push(node);
        if (node[flattenPropertyKey]) {
            var refs = [];
            for (var i = 0, len = node[flattenPropertyKey].length; i < len; i++) {
                refs[i] = flattenNode(node[flattenPropertyKey][i]);
            }
            node[flattenPropertyKey] = refs;
        }
        return node.id;
    }

    return list;

};
