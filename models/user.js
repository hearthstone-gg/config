var uuid = require('node-uuid');

function UserModel(mongoose) {
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		bnet: {
			id: String,
			token: String,
			name: String
		},
		token: String
	});

	userSchema.methods.getDisplayName = function() {
		var name = '';
		if (this.bnet.name) {
			name = this.bnet.name.split('#')[0];
		}
		return name.toLowerCase();
	};

	userSchema.methods.generateToken = function(cb){
		//TODO use bnet token in hash
		this.token = uuid.v4();
		this.save(function() {
			if (cb) { cb(); }
		});
	};

	return mongoose.model('User', userSchema);
}

module.exports = UserModel;