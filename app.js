// on récupére notre dépendance externe
const express = require('express');
const path = require('path');
const connect = require('./database/mongodb');

// on récupère nos routers
const athleteRouter = require('./routers/athlete.router');
const sportRouter = require('./routers/sport.router');

// on construit notre application qui nous servira à créer nos routes
const app = express();
// on donne un port sur lequel notre serveur écoute
const port = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

// on indique à notre app d'utiliser nos routers
app.use('/', athleteRouter);
app.use('/', sportRouter);

// notre première route !
// on envoi un Hello World si la requête est sur la racine.
app.get('/', (req, res) => {
	//res.render('index', { name: 'Jeux olympiques' });
	res.redirect('/athletes');
});

// on écoute sur notre port.
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});