var axios = require ('axios');
var _ = require('lodash');

var neData = {

    meta: function (req, appmeta){

        var path = req.path;
        console.log('path');
        console.log(path);

        var meta = _.find(appmeta, { path: path });

        if (meta === undefined){

            var meta = {
                path: "path not in config",
                meta:
                {
                    title: "Undefined path: " + req.path,
                    description: "Not found"
                }
            };

            meta.appname = process.env.APPNAME;

            console.log('meta default set');
            console.log(meta);

            return meta
        }

        meta.appname = process.env.APPNAME;

        console.log('meta init');
        console.log(meta);

        if (meta.neDataCustom){

            var meta = appmeta.custom(meta, req);

            console.log('meta with custom');
            console.log(meta);

            return meta

        }

        else {

            return meta;

            // this.sendMeta(routeMeta);


        }

    },

    timeout: function (){
        setTimeout(function(){
            console.log("Error: You dont have permission to view this content");
        },6000);
    },

    startTimeout: function(){
        this.timeout();
    },

    stopTimeout: function(){
        clearTimeout(timeout);
    },

    reqParser: function (req, state){

        state.query = req.query;

    },

    before: function(meta){
        var self = this;

        var nedbNumber = meta.neDataBefore;

        if (nedbNumber === 1) {

            console.log("Requesting < " + nedbNumber + " nedb packets > for < " + meta.title +" >");

            var nedb1 = meta.nedb1;
            // meta.nedb1.func();

            return axios.all([self.getBefore(nedb1)])
                .then(function(results){
                    return {
                        nedb1: results[0].data
                    }
                });
        }

        else if (nedbNumber === 2) {

            console.log("Requesting < " + nedbNumber + " nedb packets > for < " + meta.title +" >");

            var nedb1 = meta.nedb1;
            var nedb2 = meta.nedb2;
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

            var nedb1 = meta.nedb1;
            var nedb2 = meta.nedb2;
            var nedb3 = meta.nedb3;
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
        console.log('path');
        console.log(path);
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