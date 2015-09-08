var uuid = require('node-uuid');
var elo = require('arpad');

function UserModel(mongoose) {
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		bnet: {
			id: String,
			token: String,
			name: String
		},
		token: String,
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

	userSchema.methods.getDisplayName = function() {
		var name = '';
		if (this.bnet.name) {
			name = this.bnet.name.split('#')[0];
		}
		return name.toLowerCase();
	};

	userSchema.methods.generateToken = function(cb) {
		//TODO use bnet token in hash
		this.token = uuid.v4();
		this.save(function() {
			if (cb) {
				cb();
			}
		});
	};

	userSchema.methods.eloUpdate = function(status, opponentRating, cb) {
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

	userSchema.pre('save', function(done) {
		this.updated = new Date();
		done();
	});

	return userSchema;
}

module.exports = UserModel;