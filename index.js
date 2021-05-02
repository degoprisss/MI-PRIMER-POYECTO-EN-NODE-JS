require('dotenv').config()
const express = require('express');
const Swal = require('sweetalert2')

const { accounts_types, accounts, clients, transactions_types, transactions } = require('./models')
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// ruta para renderizar la parte de incio
app.get('/', async (req, res) => {
    try {
        
        res.render('home')
    } catch {
        res.status(404).send('<h1>Error 404, No hemos podido entrar a inicio</h1>')
        console.log(error)
    }
})

// Me dirijo a mi tabla donde tengo los tipos de cuenta que existen en mi base de datos
app.get('/accounts_types', async (req, res) => {
    try {
        let results = await accounts_types.findAll({ raw: true })
        // console.log(results)
        res.render('accounts_types', { accounts_types: results })
        // res.send('<h1>Estamos probando el renderizado</h1>')
    } catch {
        res.status(404).send('<h1>Error 404, No se puede cargar /accounts_types</h1>')
        console.log(error)
    }

})


// Creo un tipo de cuenta en mi base de datos
app.post('/accounts_types', async (req, res) => {
    const { name, description, created_at, updated_at } = req.body;
    try {
        let results = await accounts_types.create({ name, description, created_at, updated_at })
        res.redirect('/accounts_types')
    } catch {
        console.log(error)
        res.status(404).send('<h1>Error 404, No se pudo agregar el nuevo tipo de cuenta</h1>')
    }
})

// app.get('/accounts_types/:id', async (req, res) => {
//     const id = req.params.id;
//     let result = await accounts_types.findAll({ raw: true })
//     try {
//         //let result = await accounts_types.findAll({ raw: true })
//         accounts_types.destroy({
//             where: {
//                 id: id
//             }
//         });
//         res.render('accounts_types', { accounts_types: result })
//         res.send('Eliminado')
//     } catch {
//         res.send('No se ha podido eliminar nada')
//         console.log(error)
//     }
// })

// Renderizo mi formulario para actualizar los datos de un tipo de cuenta especifico. 
app.get('/accounts_type_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        let result = await accounts_types.findAll({ where: { id: id } });
        res.render('accounts_type_edit', { accounts_types: result })
    } catch {
        res.status(404).send('<h1>Error 404, no hemos podido ingresar a accounts_type_edit/:id</h1>')
    }
})

// Ruta para enviar las actualizaciones a la base de datos de un tipo de cuenta en especifico. 
app.post('/accounts_type_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        const { name, description } = req.body;
        let update = await accounts_types.update({ name, description }, {
            where: {
                id: id
            }
        });
        // let results = await accounts_types.findAll({ raw: true })
        res.redirect('/accounts_types')
    } catch {
        res.status(404).send('<h1>Error 404, No se pudo Actualizar el registro</h1>')
    }
})

// Ruta para enviar el id del registro que deseo eliminar
app.get('/accounts_type_delete/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        let id = req.params.id
        let asoc = await accounts.findAll({raw: true, where: {type: id}})
        if (asoc.length != 0) {
            await accounts.destroy({where: {id: id}})
        }
        let dele = await accounts_types.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/accounts_types')
    } catch {
        res.status(404).send('<h1>Error 404, no hemos podido eliminar el registro</h1>')
    }
})

// app.delete('/accounts_types/id', async (req, res) => {
//     const { id } = req.body;
//     console.log(id)
//     res.send('Probando delte')
// })

////////////////////////////////////////////////////////////////////

app.get('/clients', async (req, res) => {
    try {
        let results = await clients.findAll({ raw: true })
        res.render('clients', { clients: results })
    } catch {
        res.status(404).send('<h1>Error 404, no hemos podido entrar a clients/true</h1>')
    }
})

app.post('/clients', async (req, res) => {
  try {
    const { first_name, last_name, email, telephone, created_at, updated_at } = req.body;
    let newClients = await clients.create({first_name, last_name, email, telephone, created_at, updated_at})
    res.redirect('/clients')
  } catch (error) {
    res.send('No se pudo hacer nada')
    console.log(error)
  }
})

// Renderizo el formulario de actualizaciòn

app.get('/clients_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        console.log(id)
        let searchId = await clients.findAll({raw: true, where: {id: id}})
        res.render('clients_edit', {clients: searchId})
        // res.send('Estamo actualizando')
    } catch (error) {
        res.send('Error 404, no hemos podido cargar el formulario de actualización')
    }
})

// Editamos registros de la tabla clients
app.post('/clients_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        const { first_name, last_name, email, telephone } = req.body;
        console.log(id)
        let updateClients = await clients.update({ first_name, last_name, email, telephone }, {
            where: {
                id: id
            }
        })
        res.redirect('/clients')
    } catch (error) {
        res.send('<h1>Hemos tenidos problemas al hacer la actualización</h1>')
    }
})

// Eliminamos registros de la tabla clients
app.get('/clients_delete/:id', async (req, res) => {
    try {
        let id = req.params.id
        let deleteClients = await clients.destroy({where: {id: id}})
        res.redirect('/clients')
    } catch (error) {
        res.status(404).send('<h1>Error 404, Lo lamentamos, no hemos podido eliminar el registro</h1>')
        console.log(error)
    }
})


////////////////////////////////////////////////////////////////////////

app.get('/transactionsType', async (req, res) => {
    try {
        let readTransactionsType = await transactions_types.findAll({raw: true})
        res.render('transactionsType', {transactionsType: readTransactionsType})
    } catch (error) {
        
    }
})

app.post('/transactionsType', async (req, res) => {
    try {
        const { name, description, created_at, updated_at } = req.body;
        let createTransactionsType = await transactions_types.create({name, description, created_at, updated_at})
        res.redirect('transactionsType')
    } catch (error) {
        console.log(error)
        res.status(404).send('<h1>Error 404, Que triste!</h1>')
    }
})

// Actualizo los datos
app.get('/transactionsType_edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        let transactinsTypeUpdate = await transactions_types.findAll({raw: true, where: {id: id}})
        res.render('transactionsType_edit', {transactionsType: transactinsTypeUpdate})
        // res.send('<h1>Estamos Actualizando, todo sigue saliendo bien!</h1>')
    } catch (error) {
        res.send('<h1>Estoy llorando por tu rechazo!</h1>')
    }
})

app.post('/transactionsType_edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const { name, description } = req.body;
        let transactinsTypeUpdate = await transactions_types.update({name, description}, {
            where: {
                id: id
            }
        })
        console.log(name, description)
        res.redirect('/transactionsType')
    } catch (error) {
        console.log(error)
        res.send('<h1>Error 404, Lo sentimos mucho, no hemos podido actualizar el registro</h1>')
    }
})

app.get('/transactionsType_delete/:id', async (req, res) => {
    try {
        let id = req.params.id
        let destroyTypeTransactions = await transactions_types.destroy({where: {id: id}});
        res.redirect('/transactionsType')
    } catch (error) {
        res.status(404).send('<h1>Error 404, Lo sentimos no se pudo eliminar el registro!</h1>')
    }
})

///////////////////////////////////////////////////////////////////

app.get('/accounts', async (req, res) => {
    try {
        // console.log(await accounts_types.findAll({raw: true}))
        let TypeAccouts = await accounts_types.findAll({raw: true})
        let TypeClientsFind = await clients.findAll({raw: true});
        let searchAccounts = await accounts.findAll({ include: [{model: clients}, {model: accounts_types}], raw: true, nest: true})
        // console.log(JSON.stringify(searchAccounts));
        // res.send(JSON.stringify(searchAccounts))
        res.render('accounts', {typeAccounts: TypeAccouts, typeClients: TypeClientsFind, search: searchAccounts})
    } catch (error) {
        console.log(error)
        res.send('Nos falta mejorar algunas cosas') 
    }
})

app.post('/accounts', async (req, res) => {
    try {
        const { account_no, client_id1, balance, type1, created_at, updated_at } = req.body;
        let valueClients = client_id1.split(' ');
        let NameClients = valueClients[0];
        let clientId = await clients.findAll({raw: true, where: {id: NameClients}})
        let client_id = clientId[0].id;

        ////////////////////////////////////////////
        let valueAccounts = type1.split(' ');
        let valueIdAccounts = valueAccounts[0];
        console.log(valueIdAccounts);
        let typeAccount = await accounts_types.findAll({raw: true, where: {id: valueIdAccounts}})
        let type = typeAccount[0].id
        await accounts.create({account_no, client_id, balance, type, created_at, updated_at})
        res.redirect('/accounts');
    } catch (error) {
        console.log(error)
        res.status(404).send('<h1>Debe llenar todos los campos!</h1>')
    }
})

// Elimino una cuenta
app.get('/accounts_delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let asoc = await transactions.findAll({raw: true, where: {id: id}})
        if (asoc.length != 0) {
            await transactions.destroy({where: {account_ori: id}})
        }
        await accounts.destroy({where: {id: id}})
        res.redirect('/accounts')
    } catch (error) {
        res.status(404).send('<h1>Error 404. Lo sentimos, algo no salio bien!</h1>')
    }
})

app.listen(PORT, () => {
    console.log(`Servidor inciado en el puerto ${PORT}`)
})