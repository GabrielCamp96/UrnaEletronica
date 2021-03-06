module.exports = app => {
    const save = (req, res) => {
        const candidato = { ...req.body }

        const update = req.method === 'PUT'? true : false

        if(update) {
            app.db('candidato')
                .update(candidato)
                .where( {num_candidato: candidato.num_candidato} )
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('candidato')
                .insert(candidato)
                .then(_ => res.status(201).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getById = (req, res) => {
        app.db('candidato')
            .select('num_candidato', 'nome', 'nome_sup', 'partido', 'cargo', 'cidade', 'estado', 'foto')
            .where({ num_candidato: req.params.num_candidato }).first()
            .then(candidato => res.json(candidato))
            .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('candidato')
            .select('num_candidato', 'nome', 'nome_sup', 'partido', 'cargo', 'cidade', 'estado')
            .then(candidatos => res.json(candidatos))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const rowsUpdated = await app.db('candidato')
                .where({num_candidato : req.params.num_candidato})
            res.status(204).send()
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }

    return {save, getById, get ,remove}
}