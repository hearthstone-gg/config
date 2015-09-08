function GameModel(mongoose) {
	var Schema = mongoose.Schema;

	var gameSchema = new Schema({
		reporterId: String,
		status: String,
		created: {
            type: Date,
            default: Date.now
        },
		updated: Date,
		name: String,
		opponentName: String,
		processed: {
			type: Boolean,
			default: false
		}
	});

	gameSchema.pre('save', function(done) {
		this.updated = new Date();
		done();
	});

	return gameSchema;
}

module.exports = GameModel;