//BERTHORELLY Lea, M1 ILSEN
//installer les modules : npm install nomModule

const express = require('express');
const pgClient = require('pg');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const bodyParser= require('body-parser'); 

//const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

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
				//console.log('mdp bdd : '+result.rows[0].motpasse);
				//console.log('mdp entré: '+sha1(password));
				if(err){
					console.log('Erreur d’exécution de la requete, utilisateur non trouvé' + err.stack);
				} 
				else if((result.rows[0] != null) && (result.rows[0].motpasse == sha1(password)))
				{

					var user = {
						id : result.rows[0].id,
						nom : result.rows[0].nom,
						prenom: result.rows[0].prenom,
						date_naissance: result.rows[0].date_naissance,
						image: result.rows[0].avatar,
						humeur: result.rows[0].humeur,
					}

					request.session.isConnected = true;
					responseData.data=user;
					//responseData.data=result.rows[0].nom;
					responseData.statusMsg='Connexion réussie : bonjour '+result.rows[0].prenom;
					request.session.user_id = result.rows[0].id;
					responseData.statusRep=true;
					request.session.identifiant = username;
					request.session.nom = result.rows[0].nom;
					request.session.prenom = result.rows[0].prenom;
					request.session.date_de_naissance = result.rows[0].date_naissance;
					client.query("UPDATE fredouil.users SET statut_connexion = 1 WHERE identifiant ='"+username+"';",(err,result)=> {
						if(err){
							console.log('Erreur d’exécution de la requete, impossible de mettre à jour' + err.stack);
						} 
						else
							request.session.statut = 1;	
							//console.log('MAJ statut effectuée ! ');		
							//console.log("affichage de l identifiant : "+request.session.identifiant);			   

					});
				}
				else{
					responseData.statusMsg='Connexion échouée : informations de connexion incorrectes';
				}
				response.send(responseData);
			});
			client.release(); 
		}
	})

});

app.post('/profile', (request, response) => {
	//console.log('Don\'t mind me , I\'m a test ');
	var humeur = request.body.humeur;
	var image = request.body.image;
	var mdp = request.body.mdp;
	//console.log('mot de passe : '+request.body.mdp);
	if(humeur!=undefined)
	{
		sql_humeur = "UPDATE fredouil.users SET humeur = '"+ humeur +"' WHERE identifiant ='"+request.session.identifiant+"';";
	}
	if(image!=undefined)
	{
		sql_image = "UPDATE fredouil.users SET avatar = '"+ image +"' WHERE identifiant ='"+request.session.identifiant+"';";
	}
	if(mdp!=undefined)
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
			if(humeur!=undefined){
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
			else if(image!=undefined){
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
			else if(mdp!=undefined){
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

app.get('/profile',(request,response)=>{
	response.send(responseData);

});

app.get('/accueil',(request,response)=>{
	//on récupère les scores totaux par joueur :
	//sql_scores = "select id_user,SUM(score) from fredouil.historique group by id_user order by sum desc limit 10;";
	//sql_scores= "select distinct u.identifiant, score from fredouil.historique join fredouil.users u on fredouil.historique.id_user=u.id order by score desc limit 10;";
	//sql_scores="select identifiant, SUM(score) from fredouil.historique join fredouil.users on fredouil.historique.id_user=fredouil.users.id GROUP BY identifiant order by SUM(score) desc limit 10;";
	sql_scores="select identifiant,avatar, SUM(score) from fredouil.historique join fredouil.users on fredouil.historique.id_user=fredouil.users.id GROUP BY identifiant,avatar order by SUM(score) desc limit 10;";
	var pool = new pgClient.Pool({user: 'uapv1901437', host: '127.0.0.1', database: 'etd', password: 's0XNdu', port: 5432 });
	pool.connect(function(err, client, done) {
		if(err){
			console.log('Erreur , impossible de se connecter à la bdd ' + err.stack);
		} 
		else
		{
			console.log('Les 10 meilleurs scores ont été récupérés avec succès');
			client.query(sql_scores, (err, result) => {
				if(err) {
					// envoi des données
					response.json();
					console.log('Erreur , impossible d\'effectuer cette requête' + err.stack);
				}
				else {
					// envoi du top ten
					response.json(result.rows);
				}
			})
			client.release();
		}
	});

});


app.get('/quizz', (req, response) => {
	//console.log('On est dans les quizz');	
	var MongoClient = mongo.MongoClient;
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
      if (err) 
	  {
		throw err;
	  }
      var db = client.db('db');
      
      db.collection('quizz').distinct('thème', (err, result) => {
        if (err) 
		{
			throw err;
		}
		//console.log('Valeur de result : '+result);
		//on retourne les themes :)
        response.json(result);
      });
    });
});

app.post('/getQuestions' , (req,res)=>{
	mongo.MongoClient.connect(url,(err, db) => {
      if(err){
          throw err ;
      }
      var mongo = db.db("db");

      mongo.collection('quizz').find({'thème':req.body.theme}).toArray((err,result)=>{
    
     if (err) throw err;
            min = Math.ceil(1);
            max = Math.floor(30);
            const index = Math.floor(Math.random() * max-min)+min  ;
            //console.log( result[0].quizz); //affichage des questions du theme choisi + la/les réponses
            var array = [ result[0].quizz[index] , result[0].quizz[index+1] , result[0].quizz[index+2] , result[0].quizz[index+3] , result[0].quizz[index+4], , result[0].quizz[index+5], , result[0].quizz[index+6], result[0].quizz[index+7], result[0].quizz[index+8], result[0].quizz[index+9], result[0].quizz[index+10], result[0].quizz[index+11], result[0].quizz[index+12], result[0].quizz[index+13], result[0].quizz[index+14], result[0].quizz[index+15], result[0].quizz[index+16], result[0].quizz[index+17], result[0].quizz[index+18], result[0].quizz[index+19], result[0].quizz[index+20], result[0].quizz[index+21], result[0].quizz[index+22], result[0].quizz[index+23], result[0].quizz[index+24], result[0].quizz[index+25], result[0].quizz[index+26], result[0].quizz[index+27], result[0].quizz[index+28], result[0].quizz[index+29]];
	        res.send( array);
        db.close();
      }); 
    });
}) ;

app.get('/historique', (request,response) =>{

	sql_historique="select date_jeu, niveau_jeu, nb_reponses_corr,temps,score from fredouil.historique join fredouil.users on fredouil.historique.id_user=fredouil.users.id where identifiant ='"+request.session.identifiant+"'order by date_jeu ;";
	var pool = new pgClient.Pool({user: 'uapv1901437', host: '127.0.0.1', database: 'etd', password: 's0XNdu', port: 5432 });
	pool.connect(function(err, client, done) {
		if(err){
			console.log('Erreur , impossible de se connecter à la bdd ' + err.stack);
		} 
		else
		{
			console.log('L\'historique du joueur a été récupéré !');
			client.query(sql_historique, (err, result) => {
				if(err) {
					// envoi des données
					response.json();
					console.log('Erreur , impossible d\'effectuer cette requête' + err.stack);
				}
				else {
					//console.log(result.rows);
					// envoi de l'historique
					response.json(result.rows);
				}
			})
			client.release();
		}
	});
});

app.post('/ajoutPartie', (request, response) => {
	id=responseData.data.id;
	var date= request.body.date_jeu;
	var difficulte = request.body.difficulte;
	var nb_reponses_justes = request.body.bonnes_rep;
	var tps_total = request.body.temps;
	var score = request.body.score;
	console.log('id : '+id+' date : '+date+' difficulté : '+difficulte+' bonnes réponses : '+nb_reponses_justes+' temps : '+tps_total+' score : '+score);
	//sql_game = "UPDATE fredouil.historique SET id_user = '"+ id +"',date_jeu='"+date+"',niveau_jeu = '"+difficulte+"',nb_reponses_corr ='"+nb_reponses_justes+"', temps ='"+tps_total+"',score='"+score+"'WHERE identifiant ='"+request.session.identifiant+"';";
	//sql_game ="INSERT INTO fredouil.historique (id_user, date_jeu, niveau_jeu, nb_reponses_corr, temps, score) VALUES (id, date, difficulte, nb_reponses_justes, tps_total, score);";
	sql_game =`INSERT INTO fredouil.historique (id_user, date_jeu, niveau_jeu, nb_reponses_corr, temps, score) VALUES ('${id}', '${date}', '${difficulte}', '${nb_reponses_justes}','${tps_total}', '${score}');`;
	
	var pool = new pgClient.Pool({user: 'uapv1901437', host: '127.0.0.1', database: 'etd', password: 's0XNdu', port: 5432 });
	pool.connect(function(err, client, done) {
		if(err){
			console.log('Erreur , impossible de se connecter à la bdd ' + err.stack);
		} 
		else
		{
			client.query(sql_game, (err, result) => {
				if(err)
				{
					console.log('Erreur dans l execution de la requete d\'insertion' + err.stack);
					responseData.statusMsg='Impossible d\'ajouter la partie';
					responseData.data=false;
				}
				else
				{
					responseData.data=true;
					responseData.statusMsg='Partie ajoutée !';
					console.log('Partie ajoutée ! ');
				}
				response.send(responseData);
			})
			client.release();
		}
	})
});


app.get('/logout',(request,response) =>{
	request.session.destroy();
	response.send(true);
});
