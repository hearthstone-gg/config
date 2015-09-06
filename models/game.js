function GameModel(mongoose) {
	var Schema = mongoose.Schema;

	var gameSchema = new Schema({
		reporterId: String,
		status: String,
		created: {
            type: Date,
            default: Date.now
        },
		updated: Date
	});

	gameSchema.pre('save', function(done) {
		this.updated = new Date();
		done();
	});

	return mongoose.model('Game', gameSchema);
}

module.exports = GameModel;