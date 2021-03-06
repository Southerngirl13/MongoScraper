// Bring in scrap script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//bring in Headline and Note mongoose models
var Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        console.log("I'm in Fetch");
        scrape(function(data) {
            console.log("I'm in Scrape");
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(query, cb) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
};