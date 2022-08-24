const handleImage = (req, res, knex) => {

	const { id } = req.body;

	knex('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning("entries")
	  .then(entries => {
	  	res.json(entries[0].entries)
	  })
	  .catch(err => res.status(400).json("Error from image route"))

}

module.exports = { handleImage };