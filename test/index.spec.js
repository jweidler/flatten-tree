var chai = require('chai');
var expect = chai.expect;

var flattenTree = require('./../index');

describe("Flatten tree", function () {

    var tree, result;

    beforeEach(function () {

        tree = [
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
        ];

        result = [
            {id: 1, name: 'item1', children: [2, 4]},
            {id: 2, name: 'item2', children: [3]},
            {id: 3, name: 'item3'},
            {id: 4, name: 'item4'}
        ];

    });

    it("should match list", function () {

        var list = flattenTree(tree, 'children', {});

        expect(list).to.deep.equal(result);

    });

    it("should not mutate input tree when passed optional initNode() cloning nodes", function () {

        var treeClone = JSON.parse(JSON.stringify(tree));

        var list = flattenTree(tree, 'children', {
            initNode: function (node) {
                return JSON.parse(JSON.stringify(node));
            }
        });

        expect(treeClone).to.deep.equal(tree);

    });

});
