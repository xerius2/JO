const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect('mongodb+srv://admin:l8VF7JosZrieo9xk@olympicgames.wex92.mongodb.net/olympicgames?retryWrites=true&w=majority', { useNewUrlParser: true });
	} catch (err) {
		console.error('Impossible de se connecter � la base de donn�e.', err);
		throw err;
	}
	console.info('Connexion �tablie !');
}
module.exports = connect;