const handleProfile = (req, res, knex) => {

	const { id } = req.params;

	knex.select().from("users").where({ id })
		.then(user => {
			if (user.length) {
				res.json(user);
			} else {
				res.status(400).json("Not found")
			}
		})
		.catch(err => res.status(400).json("Error"))

}

module.exports = { handleProfile }