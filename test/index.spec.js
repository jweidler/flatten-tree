var chai = require('chai');
var expect = chai.expect;

var flattenTree = require('./../index');

describe("Flatten tree", function () {

    it("should match list", function () {

        var tree = [
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

        var result = [
            {id: 1, name: 'item1', children: [2, 4]},
            {id: 2, name: 'item2', children: [3]},
            {id: 3, name: 'item3'},
            {id: 4, name: 'item4'}
        ];

        var list = flattenTree(tree, 'children', {});

        expect(list).to.deep.equal(result);

    });

});
