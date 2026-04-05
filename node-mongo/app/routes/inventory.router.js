module.exports = function(app) {

    var inventories = require('../controllers/inventory.controller.js');

    app.post('/api/book', inventories.createInventory);
    app.get('/api/book/:id', inventories.getInventory);
    app.get('/api/books', inventories.inventories);
    app.put('/api/book/:id', inventories.updateInventory);
    app.delete('/api/book/:id', inventories.deleteInventory);
}