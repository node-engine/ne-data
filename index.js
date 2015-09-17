var axios = require ('axios');

var dataBefore = {

    fetch: function(pageAPIPath, pathString){
        var self = this;
        return axios.all([this.getPage(pageAPIPath, pathString)])
            .then(function(page){
                var pdNumber = page[0].data[0].pd.pdNumber;

                if (pdNumber === 0 || undefined){
                    console.log("Requesting < core > for < " + pathString +" >");
                    return {
                        page: page[0].data[0]
                    }
                }

                else if (pdNumber === 1) {

                    console.log("Requesting < core + 1 packet > for < " + pathString +" >");

                    var pd1 = page[0].data[0].pd.pd1;
                    return axios.all([self.getData(pd1)])
                        .then(function(pd){
                            return {
                                page: page[0].data[0],
                                pd1: pd[0].data
                            }
                        });
                }

                else if (pdNumber === 2) {

                    console.log("Requesting < core + 2 packets > for < " + pathString +" >");

                    var pd1 = page[0].data[0].pd.pd1;
                    var pd2 = page[0].data[0].pd.pd2;
                    return axios.all([self.getData(pd1),self.getData(pd2)])
                        .then(function(pd){
                            return {
                                page: page[0].data[0],
                                pd1: pd[0].data,
                                pd2: pd[1].data
                            }
                        });
                }

                else if (pdNumber === 3) {

                    console.log("Requesting < core + 3 packets > for < " + pathString +" >");

                    var pd1 = page[0].data[0].pd.pd1;
                    var pd2 = page[0].data[0].pd.pd2;
                    var pd3 = page[0].data[0].pd.pd3;
                    return axios.all([self.getData(pd1),self.getData(pd2),self.getData(pd3)])
                        .then(function(pd){
                            return {
                                page: page[0].data[0],
                                pd1: pd[0].data,
                                pd2: pd[1].data,
                                pd3: pd[2].data
                            }
                        });
                }

                else if (pdNumber > 3)  {
                    console.log("The page had" + pdNumber + "pre render data requests" );
                    console.log("Only a maximun of 3 pre render data requests are supported");
                    console.log("If you need more it can be added on request by opening an issue on github");
                    return {
                        errorMessage: "dataNumber did not match",
                        dataNumber: dataNumber
                    }
                }
                else {
                    console.log("pdNumber Error");
                    console.log("The page had" + pdNumber + "pre render data requests" );
                    console.log("Only a maximun of 3 pre render data requests are supported");
                    console.log("If you need more it can be added on request by opening an issue on github");
                    return {
                        errorMessage: "pdNumber error",
                        pdNumber: pdNumber
                    }
                }
            })
    },

    getPage: function(pageAPIPath, pathString) {
        return axios.get(pageAPIPath+pathString);
    },

    getData: function(pdx) {
        var path = pdx.path;
        var query = pdx-query;
        return axios.get(path);

    }

    // pd = pre render data request
    // the user can also add dr which is handled on the clientside
    // there can maybe be a if statement in here
    // if client js is active the pd is not done and is handled on the clientside
    // dr = data request
    // pd2query is a object with the query details
};

module.exports = dataBefore;