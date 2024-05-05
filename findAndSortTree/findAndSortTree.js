const data = {
    tree: [
        {
            name: 'name1',
            tree_1: [
                { name: 'name2' },
                { name: 'name3' },
                {
                    name: 'name4',
                    tree_2: [
                        { name: 'name5' },
                        { name: 'name6' },
                        {
                            tree_3: [
                                { name: undefined },
                                { name: 'name7', age: 20 },
                                { name: 'name8', age: 15 },
                                { name: 'name9', age: 31 },
                                { name: 'name10', age: 30 },
                                { name: undefined, age: undefined },
                                { name: 'empty', age: 'empty' },
                            ],
                        },
                    ],
                },
                { name: 'name11' },
            ],
        },
        {
            name: 'name12',
            tree_4: [{ name: 'name3' }],
        },
    ],
} ;


const filterAndSortTree = (data) => {
    const findTree3 = (obj) => {
        if(obj.tree_3) return obj

        for(const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const res = findTree3(obj[key])
                if(res) return res;
            }
        }
    }

    const foundedTree3 =  findTree3(data);

    if(!foundedTree3) return undefined;

    return foundedTree3.tree_3.filter(d => d.name !== 'empty' && d.age !== 'empty' && d.age && d.name).sort((a, b) => {
        const A = a.name.replace('name', '');
        const B = b.name.replace('name', '');

        return B - A
    })

}

const result = filterAndSortTree(data);

console.log(result)