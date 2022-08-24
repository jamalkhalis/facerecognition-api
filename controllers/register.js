const handleRegister = (req, res, knex, bcrypt) => {

	const {email, password, name} = req.body;
	const hash = bcrypt.hashSync(password);

	if (name && password && email) {

		knex.transaction(trx => {

			trx.insert({hash, email})
				.into("login")
				.returning('email')
				.then(loginEmail => {

					return	trx("users")
								.returning("*")
								.insert({
									name: name,
									email: loginEmail[0].email,
									joined: new Date()
								})
								.then(user => {
									res.json(user[0])
								})
				})
				.then(trx.commit)
				.catch(trx.rollback)
		})
		.catch(err => res.status(404).json('The user already exist, make to insert diffrent email!'))
	} else {
		return res.status(400).json('Incorect submition!')
	}	

}

module.exports = { handleRegister: handleRegister }