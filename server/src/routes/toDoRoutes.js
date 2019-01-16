const toDoController = require('../controllers/toDoController');

module.exports = (route) => {
    route.get('/all', (req, res, next) => {
        toDoController.getAll()
            .then((data) => res.json(data))
            .catch(err => next({ err, message: 'Error running DB', status: 500 }));
    });

    route.post('/', (req, res, next) => {
        const message = req.body.message;
        toDoController.createItem(message)
            .then(() => res.json({status: true}))
            .catch(err => next({ err, message: 'Error running DB', status: 500 }));
    });

    route.delete('/:itemId', (req, res, next) => {
        const itemId = req.params.itemId;
        toDoController.deleteItem(itemId)
            .then(() => res.json({status: true}))
            .catch(err => next({ err, message: 'Error running DB', status: 500 }));
    });
    return route;
}