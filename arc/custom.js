//var bodyParser = require("body-parser");
//var cors = require('cors');

// This is for a later implimentation to allow custom api workings appart from the defaults
// Like to do for example this
/*

 router.get('/:field1/:value1', function (req, res){

 var field1 = req.params.field1;
 var value1 = req.params.value1;
 var query1 = {};
 query1[field1] = value1;


 Model
 .find(
 query1
 )
 .sort(
 { _id: 1 }
 )
 .skip(
 req.query.limit * req.query.batch
 )
 .limit(
 req.query.limit
 )
 .exec(function (err, doc){

 res.send(doc);
 })

 });



 */

var mongooseRest = {};

mongooseRest.get = function(req, res, Model) {

    var f1 = req.query.f1;
    var v1 = req.query.v1;
    var q1 = {};
    q1[f1] = v1;

    if (v1 != null) {
        Model
            .find(
            q1
        )
            .sort(
            {_id: 1}
        )
            .skip(
            req.query.limit * req.query.batch
        )
            .limit(
            req.query.limit
        )
            .exec(function (err, doc) {

                res.send(doc);
            })
    }
    else {
        Model
            .find(
        )
            .sort(
            {_id: 1}
        )
            .skip(
            req.query.limit * req.query.batch
        )
            .limit(
            req.query.limit
        )
            .exec(function (err, doc) {
                res.send(doc);
            })
    }
};

mongooseRest.getById = function(req, res, Model) {

    var f1 = '_id';
    var v1 = req.params._id;
    var q1 = {};
    q1[f1] = v1;

    Model
        .find(
        q1
    )
        .sort(
        {_id: 1}
    )
        .skip(
        req.query.limit * req.query.batch
    )
        .limit(
        req.query.limit
    )
        .exec(function (err, doc) {

            res.send(doc);
        })

};


mongooseRest.delete = function(req, res, Model) {

    var f1 = req.query.f1;
    var v1 = req.query.v1;
    var q1 = {};
    q1[f1] = v1;

    if (v1 != null) {
        Model
            .remove(
            q1
        )
            .exec(function (err, doc){
                if (err) return console.error(err);
                res.send(f1 + ': ' + v1 + ' removed ' + doc);
            })
    }
    else {
        console.log('Please specify a valid field value pair to find the item you want to delete')
    }


};

mongooseRest.deleteById = function(req, res, Model) {

    var f1 = '_id';
    var v1 = req.params._id;
    var q1 = {};
    q1[f1] = v1;

    if (v1 != null) {
        Model
            .remove(
            q1
        )
            .exec(function (err, doc){
                if (err) return console.error(err);
                res.send(f1 + ': ' + v1 + ' removed ' + doc);
            })
    }
    else {
        console.log('Please specify a valid field value pair to find the item you want to delete')
    }


};

mongooseRest.put = function(req, res, Model){

    var f1 = req.query.f1;
    var v1 = req.query.v1;
    var q1 = {};
    q1[f1] = v1;

    var fs1 = req.query.fs1;
    var vs1 = req.query.vs1;
    var s1 = {};
    s1[fs1] = vs1;

    if (v1 != null) {
        Model
            .update(
            q1,
            {$set: s1}
        )
            .exec(function (err, doc){
                res.send(doc);
            })
    }
    else {
        console.log('Please specify a valid field value pairs to find the item and fields you want to modify')
    }


};

mongooseRest.putById = function(req, res, Model){

    var f1 = '_id';
    var v1 = req.params._id;
    var q1 = {};
    q1[f1] = v1;

    var fs1 = req.query.fs1;
    var vs1 = req.query.vs1;
    var s1 = {};
    s1[fs1] = vs1;

    if (v1 != null) {
        Model
            .update(
            q1,
            {$set: s1}
        )
            .exec(function (err, doc){
                res.send(doc);
            })
    }
    else {
        console.log('Please specify a valid field value pairs for the field you want to modify')
    }


};


mongooseRest.post = function(req, res, Model) {

    var obj = req.body;

    var newDoc = new Model(obj);
    newDoc.save(function (err, newDoc){
        if (err) return console.error(err);
        res.send(newDoc)
    })

};

/*

 mongooseRest.init = function(server, developmentMongoUrl, currentEnv){

 // this is for use in the server.js file
 // This is used for mongodb and the api stuff cross origin resource sharing
 server.use(cors());

 // for the rest API post, put requests
 server.use(bodyParser.urlencoded({ extended: false }));
 server.use(bodyParser.json());
 server.use(bodyParser.raw());
 server.use(bodyParser.text());

 if ('development' == currentEnv) {
 mongoose.connect(developmentMongoUrl);
 }

 if ('production' == currentEnv) {
 mongoose.connect(process.env.MONGO_URL);
 }
 };
 */


module.exports = mongooseRest;