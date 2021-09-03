const tasksResolver = require('./tasks');

const rootResolver = {
    ...tasksResolver
};

module.exports = rootResolver;