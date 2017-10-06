const Datastore = require('nedb');
const config = require('config');
const path = require('path');

const dbPath = path.join(config.get('dbPath'), 'articles.db');
const DB = new Datastore({filename: dbPath});

DB.ensureIndex({
    fieldName: 'hash',
    unique: true
});

function loadDatabase() {
    return new Promise((res, rej) => {
        DB.loadDatabase(err => {
            if (err) {
                rej(err);
            } else {
                res('Articles DB loaded');
            }
        });

    });

}

async function insertArticle(doc) {
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

function getArticles({published = false}) {
    const filter = published ? {status: 'published'} : {};

    return new Promise((res, rej) => {
        DB.find(filter, (err, docs) => {
            if (err) {
                rej(err);
            } else {
                res(docs);
            }
        })
    })
}

function getArticle(hash) {
    return new Promise((res, rej) => {
        DB.findOne({hash}, (err, docs) => {
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
    insertArticle,
    getArticles,
    getArticle
};
