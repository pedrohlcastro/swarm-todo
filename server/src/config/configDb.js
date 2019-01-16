module.exports = (mongoose) => {
    mongoose.connect('mongodb://mongo:27017/toDo')
    mongoose.connection.on('error', () => { throw new Error('MongoDb failed') });
    mongoose.connection.once('open', () => {
        console.log('MongoDB connected')
    })
}