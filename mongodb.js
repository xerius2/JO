const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect('mongodb+srv://admin:l8VF7JosZrieo9xk@olympicgames.wex92.mongodb.net/olympicgames?retryWrites=true&w=majority', { useNewUrlParser: true });
	} catch (err) {
		console.error('Impossible de se connecter à la base de donnée.', err);
		throw err;
	}
	console.info('Connexion établie !');
}
module.exports = connect;