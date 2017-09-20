const Datastore = require('nedb');

const DB = new Datastore({filename: process.cwd() + '/db/stores/articles.db'});

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

function insertArticle(doc) {
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

function getArticles() {
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

function getArticle(slug) {
    return new Promise((res, rej) => {
        DB.findOne({slug}, (err, docs) => {
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
