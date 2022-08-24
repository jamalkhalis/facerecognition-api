const handleSignIn = (knex, bcrypt) => (req, res) => {

	const { email, password } = req.body;

	if (email && password) {

		knex('login').where("email", "=", email)
			.then(response => {

				const isValid = bcrypt.compareSync(password, response[0].hash)

				if (isValid) {
					return knex('users').where("email", "=", email)
							.then(user => {
								res.json(user[0]);
							})
							.catch(err => res.status(400).json('Unable to get user'))
				} else {
					res.status(400).json("Wrong credentials")
				}

			})
			.catch(err => res.status(400).json("Wrong credentials"))

	} else {
		return res.status(400).json('Incorrect submition!')
	}

}

module.exports = { handleSignIn }