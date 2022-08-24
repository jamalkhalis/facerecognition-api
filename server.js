const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors')

const app = express();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'jamal',
    database : 'facerecognition-database'
  }
});
 
const register = require('./controllers/register.js');
const signIn = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');
const imageUrl = require('./controllers/imageUrl.js')

app.use(bodyParser.json());
app.use(cors())

//Sign In
app.post('/signin', signIn.handleSignIn(knex, bcrypt) )

//Register
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

//Profile
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })

//Image
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})

// handl Api
app.post('/imageUrl', imageUrl.handlApi)

app.listen(3001, () => {
	console.log("App is running on port 3001")
})


// const database = {
// 	users: [
// 		{
// 			id: "123",
// 			name: "John",
// 			email: "john@mail.com",
// 			password: "cookies",
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: "124",
// 			name: "sally",
// 			email: "sally@mail.com",
// 			password: "bananas",
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id: "335",
// 			hash: "",
// 			email: "john@mail.com"
// 		}
// 	]
// }

//Root
// app.get("/", (req, res) => {
// 	res.send(database)
// })

// Connect to database:
		// knex.select().table('users').then(data => {
		// 	console.log(data)
		// })


// Register comments:
		// bcrypt.hash(password, null, null, function(err, hash) {
		//     console.log(hash);
		// });

	// database.users.push({
	// 	id: "33",
	// 	name: name,
	// 	email: email,
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })


// Sign In:
		// if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		// 	res.json(database.users[0]);
		// } else {
		// 	res.status(400).json("Error logn in")
		// }

		// Load hash from your password DB.
		// bcrypt.compare("holly-molly", '$2a$10$rGnCejvsHUMUbYauaDA7Q.uLGlDp.xK8W.HlfL9YHKY3Mq6aMuinC', function(err, res) {
		//     console.log("first guess ", res)
		// });
		// bcrypt.compare("veggies", '$2a$10$rGnCejvsHUMUbYauaDA7Q.uLGlDp.xK8W.HlfL9YHKY3Mq6aMuinC', function(err, res) {
		//     console.log("second guess ", res)
		// });


// Profile:
		// let found = false;
		// database.users.forEach(user => {
		// 	if ( user.id === id ) {
		// 		return res.json(user);
		// 	}
		// })
		// if ( !found ) {
		// 	res.status(404).json("the user not found")
		// }


// Image
		// let found = false;
		// let count = 0;
		// database.users.forEach(user => {
		// 	if ( user.id === id ) {
		// 		count = ++user.entries;
		// 		found = true;
		// 	}
		// })
		// if ( !found ) {
		// 	res.status(404).json("the user not found")
		// } else {
		// 	res.json(count);
		// }

