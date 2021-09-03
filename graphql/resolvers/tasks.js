const Task = require('../../models/task');

module.exports = {
    createTask: async(args, req) => {
        const task = new Task({
            title: args.taskInput.title,
            description: args.taskInput.description,
            progress: args.taskInput.progress,
        });
        try {
            const result = await task.save()
            return result;
        }
        catch(err) {
            throw err;
        }
    },
    tasks: async() => {
        try {
            const tasks = await Task.find();
            return tasks.map(task => {
                return {
                    ...task._doc,
                    _id: task.id,
                }
            });
        }
        catch(err) {
            throw err;
        }
    },
    addNote: async(args, req) => {
        try{
            const task = await Task.findOne({ _id: args.taskId});
            const index = task._doc.totalNotesAdded;
            const note = {
                _id: index,
                note: args.note
            }
            task.notes.push(note);
            task.totalNotesAdded = index + 1;
            await task.save();
            return task;
        }
        catch(err) {
            throw err;
        }
    },
    updateProgress: async(args, req) => {
        try {
            if(args.progress > 100 || args.progress < 0) {
                throw new Error("Progress can onlybe  from 1 to 100")
            }
            const task = await Task.findOne({ _id: args.taskId});
            task.progress = args.progress;
            await task.save();
            return task;
        }
        catch(err) {
            throw err;
        }
    },
    editTitle: async(args, req) => {
        try {
            const task = await Task.findOne({ _id: args.taskId});
            task.title = args.title;
            await task.save();
            return task;
        }
        catch(err) {
            throw err;
        }
    },
    editDescription: async(args, req) => {
        try {
            const task = await Task.findOne({ _id: args.taskId});
            task.description = args.description;
            await task.save();
            return task;
        }
        catch(err) {
            throw err;
        }
    },
    deleteNote: async(args, req) => {
        try {
            const task = await Task.findOne({ _id: args.taskId});
            task.notes.map((note, i) => {
                if(note._id == args.noteId) {
                    task.notes.splice(i, 1);
                }
            })
            await task.save();
            return task;
        }
        catch(err) {
            throw err;
        }
    },
    deleteTask: async(args, req) => {
        try {
            const task = await Task.findOne({ _id: args.taskId});
            await Task.deleteOne({ _id: args.taskId });
            return task;
        }
        catch(err) {
            throw new err;
        }
    }
};