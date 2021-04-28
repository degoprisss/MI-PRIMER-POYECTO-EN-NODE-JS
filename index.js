require('dotenv').config()
const express = require('express');
const { accounts_types, accounts } = require('./models')
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    try {
        let result = await accounts_types.findAll({raw: true, nest: true, include: ['accounts']})
        console.log(result)
        res.render('home')
    } catch {
        res.status(404).send('<h1>Error 404, No hemos podido entrar a inicio</h1>')
        console.log(error)
    }
})

app.get('/accounts_types', async (req, res) => {
    try {
        let results = await accounts_types.findAll({ raw: true })
        res.render('accounts_types')
    } catch {
        res.send('<h1>No se pudo renderizar nad </h1>')
    }
})

app.get('/clients',  async(req, res) => {
    try {
        let results =  await accounts_types.findAll({ raw: true })
        // console.log(results)
        res.render('clients', { accounts_types: results })
        console.log(results)
        // res.send('<h1>Estamos probando el renderizado</h1>')
    } catch {
        res.send('<h1>No se puede cargar la pagina</h1>')
        console.log(error)
    }

})

app.get('/clients/:id', async (req, res) => {
    const id = req.params.id;
    let result = await accounts_types.findAll({ raw: true })
    res.render('home', { accounts_types: result })
    try {
        //let result = await accounts_types.findAll({ raw: true })
        accounts_types.destroy({
            where: {
                id: id
            }
        });
        //res.render('clients', { accounts_types: result })
        res.send('Eliminado')
    } catch {
        res.send('No se ha podido eliminar nada')
        console.log(error)
    }
})

app.get('/accounts_type_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        let result = await accounts_types.findAll({ where: { id: id } });
        res.render('accounts_type_edit', { accounts_types: result })
    } catch {
        res.render('clients')
    }
})

app.post('/accounts_type_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        const { name, description } = req.body;
        let update = await accounts_types.update({ name, description }, {
            where: {
                id: id
            }
        });
        let results = await accounts_types.findAll({ raw: true })
        res.redirect('/clients')
    } catch {
        res.send('<h1>No se pudo Actualizar nada</h1>')
    }
})

app.get('/accounts_type_delete/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        let id = req.params.id
        let dele = await accounts_types.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/clients')
    } catch {
        res.send('<h1>Error</h1>')
    }
})

app.post('/accounts_types', async (req, res) => {
    const { name, description, created_at, updated_at } = req.body;
    try {
        let results = await accounts_types.create({ name, description, created_at, updated_at })
        res.redirect('/clients')
    } catch {
        console.log(error)
        res.status(400).send('<h1>No se pudo agregar el tipo de cuenta</h1>')
    }
})

app.delete('/accounts_types/id', async (req, res) => {
    const { id } = req.body;
    console.log(id)
    res.send('Probando delte')
})

app.listen(PORT, () => {
    console.log(`Servidor inciado en el puerto ${PORT}`)
})