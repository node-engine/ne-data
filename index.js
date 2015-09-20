var axios = require ('axios');
var _ = require('lodash');

var neData = {

    meta: function (req, handlerConfig){

        var path = req.path
        console.log('path');
        console.log(path);

        var meta = _.find(handlerConfig.config, { path: path });

        console.log('metaeta init');
        console.log(meta);

        if (meta === undefined){

            var meta = {
                path: "path not in config",
                meta:
                {
                    title: "Undefined path: " + req.path,
                    description: "Not found"
                }
            };

            return meta
        }

        if (meta.nedCustom){

            console.log('meta in custom before')
            console.log(meta)

            var meta = handlerConfig.custom(meta, req)

            console.log('meta in custom after')
            console.log(meta)

            return meta

        }

        else {

            console.log('meta init else');
            console.log(meta);

            return meta

            // this.sendMeta(routeMeta);


        }

    },

    before: function(meta){
        var self = this;

        var nedbNumber = meta.nedBefore.number;

        if (nedbNumber === 1) {

            console.log("Requesting < " + nedbNumber + " nedb packets > for < " + meta.title +" >");

            var nedb1 = meta.nedBefore.nedb1
            return axios.all([self.getBefore(nedb1)])
                .then(function(results){
                    return {
                        nedb1: results[0].data
                    }
                });
        }

        else if (nedbNumber === 2) {

            console.log("Requesting < " + nedbNumber + " nedb packets > for < " + meta.title +" >");

            var nedb1 = meta.nedBefore.nedb1
            var nedb2 = meta.nedBefore.nedb2
            return axios.all([self.getBefore(nedb1),self.getBefore(nedb2)])
                .then(function(results){
                    return {
                        nedb1: results[0].data,
                        nedb2: results[1].data
                    }
                });
        }

        else if (nedbNumber === 3) {

            console.log("Requesting < " + nedbNumber + " nedb packets > for < " + meta.title +" >");

            var nedb1 = dataReq.nedBefore.nedb1
            var nedb2 = dataReq.nedBefore.nedb2
            var nedb3 = dataReq.nedBefore.nedb3
            return axios.all([self.getBefore(nedb1),self.getBefore(nedb2),self.getBefore(nedb3)])
                .then(function(results){
                    return {
                        nedb1: results[0].data,
                        nedb2: results[1].data,
                        nedb3: results[2].data
                    }
                });
        }

        else if (nedbNumber > 3)  {
            console.log("The page had" + nedbNumber + "pre render data requests" );
            console.log("Only a maximun of 3 pre render data requests are supported");
            console.log("If you need more it can be added on request by opening an issue on github");
            return {
                errorMessage: "dataNumber did not match",
                dataNumber: nedbNumber
            }
        }
        else {
            console.log("nedbNumber Error");
            console.log("The page had" + nedbNumber + "pre render data requests" );
            console.log("Only a maximun of 3 pre render data requests are supported");
            console.log("If you need more it can be added on request by opening an issue on github");
            return {
                errorMessage: "pdNumber error",
                pdNumber: nedbNumber
            }
        }
    },

    getBefore: function(nedbx) {
        var path = nedbx.path;
        var query = nedbx-query;
        return axios.get(path);

    },

    cycleBefore: function(){

    },

    after: function(){
        console.log("Future feature for getting data after the page has rendered already and updating the page")
    },

    cycleAfter: function(){

    },

    query: function(){

    }

    // pd = pre render data request
    // the user can also add dr which is handled on the clientside
    // there can maybe be a if statement in here
    // if client js is active the pd is not done and is handled on the clientside
    // dr = data request
    // pd2query is a object with the query details
};

module.exports = neData;