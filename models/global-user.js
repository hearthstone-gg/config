var elo = require('arpad');

function GlobalUserModel(mongoose) {
	var Schema = mongoose.Schema;

	var globalUserSchema = new Schema({
		name: String,
		created: {
            type: Date,
            default: Date.now
        },
		updated: Date,
		elo: {
			type: Number,
			default: 1600
		}
	});

	globalUserSchema.methods.getDisplayName = function() {
		return this.name.toLowerCase();
	};

	globalUserSchema.methods.eloUpdate = function(status, opponentRating, cb) {
		var elo = new Elo();
		switch(status) {
			case 'WIN':
				this.elo = newRatingIfWon(this.elo, opponentRating);
				break;
			case 'LOSS':
				this.elo = newRatingIfLost(this.elo, opponentRating);
				break;
			case 'TIE':
				this.elo = newRatingIfTied(this.elo, opponentRating);
				break;
		}
		this.save(function() {
			if (cb) {
				cb();
			}
		});
	};

	globalUserSchema.pre('save', function(done) {
		this.updated = new Date();
		done();
	});

	return globalUserSchema;
}

module.exports = GlobalUserModel;