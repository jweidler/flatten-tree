var chai = require('chai');
var expect = chai.expect;

var flattenTree = require('./../index');

describe("Flatten tree", function () {

    var result;
    var treeGen = function () {
        return [
            {
                name: 'item1',
                children: [
                    {
                        name: 'item2',
                        children: [
                            {name: 'item3'}
                        ]
                    },
                    {name: 'item4'}
                ]
            }
        ]
    };

    beforeEach(function () {

        result = [
            {id: 1, name: 'item1', children: [2, 3]},
            {id: 2, name: 'item2', children: [4]},
            {id: 3, name: 'item4'},
            {id: 4, name: 'item3'}
        ];

    });

    it("should match list", function () {

        var list = flattenTree(treeGen(), 'children', {});

        expect(list).to.deep.equal(result);

    });

    it("should not mutate input tree when passed optional initNode() cloning nodes", function () {

        var tree = treeGen();
        var treeClone = JSON.parse(JSON.stringify(tree));

        var list = flattenTree(tree, 'children', {
            initNode: function (node) {
                return JSON.parse(JSON.stringify(node));
            }
        });

        expect(treeClone).to.deep.equal(tree);

    });

    it("should handle deeply nested tree properly", function () {

        this.timeout(100000);

        var treeNode = {
            name: 'item',
            children: []
        };

        result = [];

        function generateChildren(node) {
            node.children.push(JSON.parse(JSON.stringify(node)));
            return node.children[0];
        }

        var node = treeNode;

        for (var i = 0; i < 10000; i++) {
            node = generateChildren(node);
            result.push({id: i + 1, name: 'item', children: [i + 2]});
        }

        result.push({id: i + 1, name: 'item', children: []});

        var list = flattenTree([treeNode], 'children', {});

        expect(result).to.deep.equal(list);

    });

});
