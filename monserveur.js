//BERTHORELLY Lea, M1 ILSEN
//installer les modules : npm install nomModule

const express = require('express');
const pgClient = require('pg');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const bodyParser= require('body-parser'); 

const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.static(__dirname + '/dist/CeriGame/'));
app.listen(3115,function(){
	console.log('listening on port 3115');
});
/*app.post('/',function(request, response){
	response.sendfile('login.html');
});*/

var sha1 = require('sha1');
const url= 'mongodb://127.0.0.1:27017/db';
app.use(session({
	secret:'secretPhrase',
	saveUninitialized: false,
	resave: false,
	store: new MongoDBStore({
		uri: url,
		collection:'MySession3115',
		touchAfter: 24 * 3600
   }), 
 cookie: {maxAge: 24 * 3600 * 1000}
}));


var responseData={"statusMsg": " ", "statusRep" : false, "username": " "};

app.use(bodyParser.urlencoded({extended: true})); // Charge le middleware bodyParser dans la pile pour lire les données au format HTML (&, =, %)
app.use(bodyParser.json({limit: '10mb'})); // Charge le middleware dans la pile pour lire les données au format JSON

app.post('/login', (request, response) => {
	var username = request.body.username;
	var password = request.body.password;
	//console.log('l utilisateur est : '+JSON.stringify(request.body.username));
	//console.log('le mdp est : '+JSON.stringify(request.body.password));

	sql = "select * from fredouil.users where identifiant='"+username+"';";

	var pool = new pgClient.Pool({user: 'uapv1901437', host: '127.0.0.1', database: 'etd', password: 's0XNdu', port: 5432 });
	pool.connect(function(err, client, done) {
		if(err) {
			console.log('Connexion à la bdd impossible' + err.stack);
		} 
		else {
			console.log('Connexion vers la bdd établie avec succès')
			
			client.query(sql, (err, result) => {
				//console.log(username);
				console.log('mdp bdd : '+result.rows[0].motpasse);
				console.log('mdp entré: '+sha1(password));
				if(err){
					console.log('Erreur d’exécution de la requete, utilisateur non trouvé' + err.stack);
				} 
				else if((result.rows[0] != null) && (result.rows[0].motpasse == sha1(password)))
				{

					request.session.isConnected = true;
					responseData.data=true;
					//responseData.data=result.rows[0].nom;
					responseData.statusMsg='Connexion réussie : bonjour '+result.rows[0].prenom;
					request.session.user_id = result.rows[0].id;
					responseData.statusRep=true;
					request.session.identifiant = username;

					request.session.nom = result.rows[0].nom;
					request.session.prenom = result.rows[0].prenom;
					request.session.date_de_naissance = result.rows[0].date_naissance;
					//console.log('Connexion réussie : bienvenue utilisateur '+ username);
					//console.log('Etat connexion: '+result.rows[0].statut_connexion);
					console.log('Youhou vous êtes connecté !');
					client.query("UPDATE fredouil.users SET statut_connexion = 1 WHERE identifiant ='"+username+"';",(err,result)=> {
						if(err){
							console.log('Erreur d’exécution de la requete, impossible de mettre à jour' + err.stack);
						} 
						else
							request.session.statut = 1;	
							console.log('MAJ statut effectuée ! ');		
							//console.log("affichage de l identifiant : "+request.session.identifiant);			   

					});

					//response.sendFile( __dirname  + '/accueil.component.html'); 
				}
				else{
					//console.log('Connexion échouée : informations de connexion incorrectes');
					responseData.statusMsg='Connexion échouée : informations de connexion incorrectes';
					responseData.data=false;

				}
				response.send(responseData);
			});
			client.release(); 
		}
	})

});

app.post('/profile', (request, response) => {
	//console.log('Don\'t mind me , I\'m a test ');
	//console.log('date de naissance : '+request.session.date_de_naissance);
	var humeur = request.body.humeur;
	var image = request.body.image;
	var mdp = request.body.mdp;
	//console.log('mot de passe : '+mdp);
	if(humeur!=null||humeur!='')
	{
		sql_humeur = "UPDATE fredouil.users SET humeur = '"+ humeur +"' WHERE identifiant ='"+request.session.identifiant+"';";
	}
	if(image!=null||image!='')
	{
		sql_image = "UPDATE fredouil.users SET avatar = '"+ image +"' WHERE identifiant ='"+request.session.identifiant+"';";
	}
	if(mdp!=null||mdp!='')
	{
		sql_mdp = "UPDATE fredouil.users SET motpasse = '"+ sha1(mdp) +"' WHERE identifiant ='"+request.session.identifiant+"';";
	}

	var pool = new pgClient.Pool({user: 'uapv1901437', host: '127.0.0.1', database: 'etd', password: 's0XNdu', port: 5432 });
	pool.connect(function(err, client, done) {
		if(err){
			console.log('Erreur , impossible de se connecter à la bdd ' + err.stack);
		} 
		else
		{
			if(humeur!=null||humeur!=''){
				client.query(sql_humeur, (err, result) => {
					if(err)
					{
						console.log('erreur dans l execution de la requete ' + err.stack);
						responseData.statusMsg='Impossible de modifier l humeur';
						responseData.data=false;
					}
					else
					{
						responseData.data=true;
						responseData.statusMsg='Humeur modifiée !';
						console.log('MAJ humeur réussie ! ');
					}
					response.send(responseData);
				})
			}
			else if(image!=null||image!=''){
				client.query(sql_image, (err, result) => {
					if(err)
					{
						console.log('erreur dans l execution de la requete ' + err.stack);
						responseData.statusMsg='Impossible de modifier l image';
						responseData.data=false;
					}
					else
					{
						responseData.data=true;
						responseData.statusMsg='Image modifiée !';
						console.log('MAJ image réussie ! ');
					}
					response.send(responseData);
				})
			}
			else if(mdp!=null||mdp!=''){
				client.query(sql_mdp, (err, result) => {
					if(err)
					{
						console.log('erreur dans l execution de la requete ' + err.stack);
						responseData.statusMsg='Impossible de modifier le mot de passe';
						responseData.data=false;
					}
					else
					{
						responseData.data=true;
						responseData.statusMsg='Mot de passe modifié !';
						console.log('MAJ mdp réussie ! ');
					}
					response.send(responseData);
				})
			}
			
			client.release();
		}
	});
});


//Connection à la base MongoDB
app.get('/quizz', (request, response) => {
    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, 
        function(err, mongoClient) {
        if(err) {
			return console.log('Connexion à la bdd impossible'); 
		}
        if(mongoClient) 
		{ // Exécution des requêtes - findOne
            console.log('connection MongoDB');
            mongoClient.db().collection('quizz').find().toArray((function(err, data)
			{
                if(err) return console.log('erreur');
                if(data){  
                    console.log('requête effectuée !');
                    
                    var listeThemes = new Array();
                    for(let i = 0; i<JSON.stringify(data.length); i++)
                    {
                        listeThemes[i]=data[i].thème;
                    }
                    console.log(JSON.stringify(listeThemes));
                    response.send(listeThemes);
                    mongoClient.close();
                }
            }));
        }
    });
});

app.get('/logout',(request,response) =>{
	request.session.destroy();
	response.send(true);
});
