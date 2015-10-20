var fs = require('fs');


var neAuto;
if(process.env.NE_AUTO){
    neAuto = process.env.NE_AUTO
}
else {
    neAuto = "ne-auto-off"
}

var cors = require(neAuto).cors || require('cors');
var express = require(neAuto).express || require('express');
var neAuth = require (neAuto).neAuth || require ('ne-auth');

var neData = {

    routesConfig: function (server, dirName, passport, strategyName){

        var dataPath = "/data";

        // This is used for mongodb and the api stuff cross origin resource sharing
        server.use(cors());

        fs.readdirSync(dirName + dataPath ).forEach(function(filename) {

            var routePath = dataPath + "/" + filename.substr(0,filename.length - 3);

            var router = express.Router();
            require(dirName + dataPath + '/' + filename).routes(router, passport, strategyName);
            server.use(routePath, router);

        });
    },

    get: function (router, Model){

        router.get('/',function(req, res) {

            var f1 = req.query.f1;
            var v1 = req.query.v1;
            var q1 = {};
            q1[f1] = v1;

            var skipValue
            if (req.query.limit){

                pageNumber = parseInt(req.query.batch) - 1;
                skipValue = req.query.limit * pageNumber;
            }
            else {
                skipValue = 0
            }


            if (v1 != null) {
                Model
                    .find(
                    q1
                )
                    .sort(
                    {_id: 1}
                )
                    .skip(
                    skipValue
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
                    skipValue
                )
                    .limit(
                    req.query.limit
                )
                    .exec(function (err, doc) {
                        res.send(doc);
                    })
            }
        });

        router.get('/:_id',function(req, res) {

            var f1 = '_id';
            var v1 = req.params._id;
            var q1 = {};
            q1[f1] = v1;

            var skipValue
            if (req.query.limit){

                pageNumber = parseInt(req.query.batch) - 1;
                skipValue = req.query.limit * pageNumber;
            }
            else {
                skipValue = 0
            }

            Model
                .find(
                q1
            )
                .sort(
                {_id: 1}
            )
                .skip(
                skipValue
            )
                .limit(
                req.query.limit
            )
                .exec(function (err, doc) {

                    res.send(doc);
                })

        });

    },

    getWithPermissions: function (router, Model, permissionsArray){

        router.get('/',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

                var f1 = req.query.f1;
                var v1 = req.query.v1;
                var q1 = {};
                q1[f1] = v1;

                var skipValue
                if (req.query.limit){

                    pageNumber = parseInt(req.query.batch) - 1;
                    skipValue = req.query.limit * pageNumber;
                }
                else {
                    skipValue = 0
                }

                if (v1 != null) {
                    Model
                        .find(
                        q1
                    )
                        .sort(
                        {_id: 1}
                    )
                        .skip(
                        skipValue
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
                        skipValue
                    )
                        .limit(
                        req.query.limit
                    )
                        .exec(function (err, doc) {
                            res.send(doc);
                        })
                }
            });

        router.get('/:_id',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

                var f1 = '_id';
                var v1 = req.params._id;
                var q1 = {};
                q1[f1] = v1;

                var skipValue
                if (req.query.limit){

                    pageNumber = parseInt(req.query.batch) - 1;
                    skipValue = req.query.limit * pageNumber;
                }
                else {
                    skipValue = 0
                }

                Model
                    .find(
                    q1
                )
                    .sort(
                    {_id: 1}
                )
                    .skip(
                    skipValue
                )
                    .limit(
                    req.query.limit
                )
                    .exec(function (err, doc) {

                        res.send(doc);
                    })

            });

    },


    delete: function (router, Model){

        router.delete('/',function(req, res) {

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


        });

        router.delete('/:_id',function(req, res) {

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


        });

    },

    deleteWithPermissions: function (router, Model, permissionsArray){

        router.delete('/',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

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


            });

        router.delete('/:_id',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

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


            });

    },

    deleteWithPassport: function (router, Model, passport, strategyName){

        router.delete('/',

            passport.authenticate(strategyName, {session: false}),

            function(req, res) {

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


            });

        router.delete('/:_id',

            passport.authenticate(strategyName, {session: false}),

            function(req, res) {

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


            });

    },

    put: function (router, Model){

        router.put('/',function(req, res) {

            var f1 = req.query.f1;
            var v1 = req.query.v1;
            var q1 = {};
            q1[f1] = v1;

            var config = {};
            config['multi'] = false;
            if (req.query.multi){
                config['multi'] = true;
            }

            console.log("--------------------");
            console.log("Put request received");

            var json = req.body;

            if (Object.keys(json).length === 0){
                console.log("No JSON request body found");
                console.log("Trying to use query params");

                var fs1 = req.query.fs1;
                var vs1 = req.query.vs1;
                var s1 = {};
                s1[fs1] = vs1;

                if (fs1 != null && vs1 != null) {
                    Model
                        .update(
                        q1,
                        {
                            $set: s1
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using query params");
                    console.log("--------------------");
                }
                else if (fs1 != null ){
                    var msg = "ERROR: No fs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }
                else if (vs1 != null ){
                    var msg = "ERROR: No vs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }

            }
            else if (Object.keys(json).length !== 0) {
                console.log("JSON request body object found");

                Model
                    .update(
                    q1,
                    {
                        $set: json
                    },
                    config
                )
                    .exec(function (err, doc){
                        res.send(doc);
                    });
                console.log("Put request executed using JSON request body object");
                console.log("--------------------");

            }
            else {
                var msg = "ERROR: Unknown reason";
                console.error(msg);
                res.send(msg);
                console.log("--------------------");
            }


        });

        router.put('/:_id',function(req, res) {

            var f1 = '_id';
            var v1 = req.params._id;
            var q1 = {};
            q1[f1] = v1;

            var config = {};
            config['multi'] = false;
            if (req.query.multi){
                config['multi'] = true;
            }

            console.log("--------------------");
            console.log("Put request received");

            var json = req.body;

            if (Object.keys(json).length === 0){
                console.log("No JSON request body found");
                console.log("Trying to use query params");

                var fs1 = req.query.fs1;
                var vs1 = req.query.vs1;
                var s1 = {};
                s1[fs1] = vs1;

                if (fs1 != null && vs1 != null) {
                    Model
                        .update(
                        q1,
                        {
                            $set: s1
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using query params");
                    console.log("--------------------");
                }
                else if (fs1 != null ){
                    var msg = "ERROR: No fs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }
                else if (vs1 != null ){
                    var msg = "ERROR: No vs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }

            }
            else if (Object.keys(json).length !== 0) {
                console.log("JSON request body object found");

                Model
                    .update(
                    q1,
                    {
                        $set: json
                    },
                    config
                )
                    .exec(function (err, doc){
                        res.send(doc);
                    });
                console.log("Put request executed using JSON request body object");
                console.log("--------------------");

            }
            else {
                var msg = "ERROR: Unknown reason";
                console.error(msg);
                res.send(msg);
                console.log("--------------------");
            }



        });

    },

    putWithPermissions: function (router, Model, permissionsArray){

        router.put('/',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

                var f1 = req.query.f1;
                var v1 = req.query.v1;
                var q1 = {};
                q1[f1] = v1;

                var config = {};
                config['multi'] = false;
                if (req.query.multi){
                    config['multi'] = true;
                }

                console.log("--------------------");
                console.log("Put request received");

                var json = req.body;

                if (Object.keys(json).length === 0){
                    console.log("No JSON request body found");
                    console.log("Trying to use query params");

                    var fs1 = req.query.fs1;
                    var vs1 = req.query.vs1;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (fs1 != null && vs1 != null) {
                        Model
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc){
                                res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (fs1 != null ){
                        var msg = "ERROR: No fs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }
                    else if (vs1 != null ){
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }

                }
                else if (Object.keys(json).length !== 0) {
                    console.log("JSON request body object found");

                    Model
                        .update(
                        q1,
                        {
                            $set: json
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using JSON request body object");
                    console.log("--------------------");

                }
                else {
                    var msg = "ERROR: Unknown reason";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }


            });

        router.put('/:_id',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

                var f1 = '_id';
                var v1 = req.params._id;
                var q1 = {};
                q1[f1] = v1;

                var config = {};
                config['multi'] = false;
                if (req.query.multi){
                    config['multi'] = true;
                }

                console.log("--------------------");
                console.log("Put request received");

                var json = req.body;

                if (Object.keys(json).length === 0){
                    console.log("No JSON request body found");
                    console.log("Trying to use query params");

                    var fs1 = req.query.fs1;
                    var vs1 = req.query.vs1;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (fs1 != null && vs1 != null) {
                        Model
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc){
                                res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (fs1 != null ){
                        var msg = "ERROR: No fs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }
                    else if (vs1 != null ){
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }

                }
                else if (Object.keys(json).length !== 0) {
                    console.log("JSON request body object found");

                    Model
                        .update(
                        q1,
                        {
                            $set: json
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using JSON request body object");
                    console.log("--------------------");

                }
                else {
                    var msg = "ERROR: Unknown reason";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }



            });

    },

    putWithPassport: function (router, Model, passport, strategyName){

        router.put('/',

            passport.authenticate(strategyName, {session: false}),

            function(req, res) {

                var f1 = req.query.f1;
                var v1 = req.query.v1;
                var q1 = {};
                q1[f1] = v1;

                var config = {};
                config['multi'] = false;
                if (req.query.multi){
                    config['multi'] = true;
                }

                console.log("--------------------");
                console.log("Put request received");

                var json = req.body;

                if (Object.keys(json).length === 0){
                    console.log("No JSON request body found");
                    console.log("Trying to use query params");

                    var fs1 = req.query.fs1;
                    var vs1 = req.query.vs1;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (fs1 != null && vs1 != null) {
                        Model
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc){
                                res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (fs1 != null ){
                        var msg = "ERROR: No fs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }
                    else if (vs1 != null ){
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }

                }
                else if (Object.keys(json).length !== 0) {
                    console.log("JSON request body object found");

                    Model
                        .update(
                        q1,
                        {
                            $set: json
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using JSON request body object");
                    console.log("--------------------");

                }
                else {
                    var msg = "ERROR: Unknown reason";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }


            });

        router.put('/:_id',

            passport.authenticate(strategyName, {session: false}),

            function(req, res) {

                var f1 = '_id';
                var v1 = req.params._id;
                var q1 = {};
                q1[f1] = v1;

                var config = {};
                config['multi'] = false;
                if (req.query.multi){
                    config['multi'] = true;
                }

                console.log("--------------------");
                console.log("Put request received");

                var json = req.body;

                if (Object.keys(json).length === 0){
                    console.log("No JSON request body found");
                    console.log("Trying to use query params");

                    var fs1 = req.query.fs1;
                    var vs1 = req.query.vs1;
                    var s1 = {};
                    s1[fs1] = vs1;

                    if (fs1 != null && vs1 != null) {
                        Model
                            .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                            .exec(function (err, doc){
                                res.send(doc);
                            });
                        console.log("Put request executed using query params");
                        console.log("--------------------");
                    }
                    else if (fs1 != null ){
                        var msg = "ERROR: No fs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }
                    else if (vs1 != null ){
                        var msg = "ERROR: No vs1 query param specified";
                        console.error(msg);
                        res.send(msg);
                        console.log("--------------------");
                    }

                }
                else if (Object.keys(json).length !== 0) {
                    console.log("JSON request body object found");

                    Model
                        .update(
                        q1,
                        {
                            $set: json
                        },
                        config
                    )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using JSON request body object");
                    console.log("--------------------");

                }
                else {
                    var msg = "ERROR: Unknown reason";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }



            });

    },

    post: function (router, Model){

        router.post('/',function(req, res) {

            var obj = req.body;

            var newDoc = new Model(obj);
            newDoc.save(function (err, newDoc){
                if (err) return console.error(err);
                res.send(newDoc)
            })

        });

    },

    postWithPermissions: function (router, Model,permissionsArray){

        router.post('/',

            neAuth.validateToken(), neAuth.checkPermissions(permissionsArray),

            function(req, res) {

                var obj = req.body;

                var newDoc = new Model(obj);
                newDoc.save(function (err, newDoc){
                    if (err) return console.error(err);
                    res.send(newDoc)
                })

            });

    },

    postWithPassport: function (router, Model, passport, strategyName){

        router.post('/',

            passport.authenticate(strategyName, {session: false}),

            function(req, res) {

                var obj = req.body;

                var newDoc = new Model(obj);
                newDoc.save(function (err, newDoc){
                    if (err) return console.error(err);
                    res.send(newDoc)
                })

            });

    },

    custom: function (){
        console.log("This Feature is not available yet");
    }

};

module.exports = neData;