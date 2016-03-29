# flatten-tree
--------------
[![npm version](https://badge.fury.io/js/flatten-tree.svg)](https://badge.fury.io/js/flatten-tree)
[![Dependency Status](https://david-dm.org/jweidler/flatten-tree.svg)](https://david-dm.org/jweidler/flatten-tree)
[![devDependency Status](https://david-dm.org/jweidler/flatten-tree/dev-status.svg)](https://david-dm.org/jweidler/flatten-tree#info=devDependencies)

Transforms a nested tree structure into a flat list.

## Install

```bash
$ npm i flatten-tree
```

## Use

```javascript
import flattenTree from 'flatten-tree';

const tree = [
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

const options = {
    initNode: node => node, // <= default, consider node => _.clone(node) to avoid mutating the tree
};

const list = flattenTree(tree, 'children', options);
```

Results in:

```javascript
[
    {id: 1, name: 'item1', children: [2, 4]},
    {id: 2, name: 'item2', children: [3]},
    {id: 3, name: 'item3'},
    {id: 4, name: 'item4'}
]
```

## Test

`npm test`
