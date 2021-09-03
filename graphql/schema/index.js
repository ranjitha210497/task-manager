const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Task {
        _id: ID!
        title: String!
        description: String!
        progress: Float!
        notes: [Note!]!
        totalNotesAdded: Float!
        createdAt: String!
        updatedAt: String!
    }

    type Note {
        _id: ID!
        note: String!
    }


    input taskInput {
        title: String!
        description: String
        progress: Float
    }

    type RootQuery{
        tasks: [Task!]!
    }

    type RootMutation {
        createTask(taskInput: taskInput): Task!
        addNote(taskId: ID!, note: String!): Task!
        updateProgress(taskId: ID!, progress: Float!): Task!
        editTitle(taskId: ID!, title: String!): Task!
        editDescription(taskId: ID!, description: String!): Task!
        deleteNote(taskId: ID!, noteId: ID!): Task!
        deleteTask(taskId: ID!): Task!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);