const Datastore = require('nedb');
const config = require('config');
const path = require('path');

const dbPath = path.join(config.get('dbPath'), 'customCollections.db');
const DB = new Datastore({filename: dbPath});

DB.ensureIndex({
    fieldName: 'name',
    unique: true
});

function loadDatabase() {
    return new Promise((res, rej) => {
        DB.loadDatabase(err => {
            if (err) {
                rej(err);
            } else {
                res('Custom collections DB loaded');
            }
        });

    });

}

function addCustomCollection(doc) {
    return new Promise((res, rej) => {
        DB.insert(doc, (err, doc) => {
            if (err) {
                rej(err);
            } else {
                res(doc);
            }
        })
    })
}

function getCustomCollections() {
    return new Promise((res, rej) => {
        DB.find({}, (err, docs) => {
            if (err) {
                rej(err);
            } else {
                res(docs);
            }
        })
    })
}

function getCollection(name) {
    return new Promise((res, rej) => {
        DB.findOne({name}, (err, docs) => {
            if (err) {
                rej(err);
            } else {
                res(docs);
            }
        })
    })
}

module.exports = {
    loadDatabase,
    getCollection,
    getCustomCollections,
    addCustomCollection
};
