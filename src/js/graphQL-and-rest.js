// here's an example from my side project
async users(root, args, context) {
const results = await User.findAll({
    order: [['createdAt', 'DESC']],
        context,
    });

    return results;
},
// i could add another call
// something like this

async users(root, args, context)
    // ORM GRAPHQL
    const results = await User.findAll({
        order: [['createdAt', 'DESC']],
        context,
    });

    // REST
    const mapData = await fetch('https://api.google.com/maps?blah=123');

    return Promise.all(results, mapData);
},
