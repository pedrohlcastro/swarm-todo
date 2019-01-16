const Item = require('../model/item');

class toDoController{
    getAll(){
        return new Promise((resolve, reject) => {
            Item.find({}).exec()
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    createItem(message){
        return new Promise((resolve, reject) => {
            const newItem = new Item({message});
            newItem.save()
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    deleteItem(itemId){
        return new Promise((resolve, reject) => {
            Item.findByIdAndDelete(itemId).exec()
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
}

module.exports = new toDoController();