# ne-data (Node Engine Data)

A quick and simple way to create a structured restAPI using, NodeJS, MongoDB and Mongoose.

## Snippit from the Server file 

Just add this code and it will automatically add any additional files you place in the api folder. the route for the api will be domain.com/apiPath/filename

where
- apiPath is the apiPath you set in the server file 
- filename is the name of the file in the api folder

```js

var neData = require('ne-data');

var dirName = __dirname;
var apiPath = "/api";
neData.server(server, dirName, apiPath);


```

## Sample API file

Define the schema in any way you want and create as many as you want.

These files need to be in a folder matching the apiPath you provides in the same directory as the server file

```js

var router = require('express').Router();
var mongoose = require('mongoose');
var neData = require('ne-data');

var pageSchema = {
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    pd:{
        pdNumber:{type: Number, required: false, default: '0'},
        pd1:{
            path: {type: String, required: false}
        }
    },
    createdAt:{type: String, required: true}

};

var Model = mongoose.model(
    'Page',
    pageSchema,
    'page');


neData.model(router, Model);


module.exports = router;


```

## API Features

Post 
The entire request body becomes the object that is posted

Get
Get by Id
Get with Limit results to number 
Get with Limit and cycle 

Put 
Put by Id

Delete
Delete by Id

Use query field value pairs find specific documents
http://localhost:3001/api/page?f1=pathField&v1=pathFieldValue

- get will get the document where the pathField matches the pathFieldValue
- delete will delete the document where the pathField matches the pathFieldValue
- put will edit the document where the pathField matches the pathFieldValue, two addidional query params are needed to give the field you want to edit and the new value for the that field

If you are interested in more details on the working of the api please ask.


## Steps

1. Connect to mongoDB using mongoose
2. Require and NPM install the dependencies 
3. Define your schema using mongoose syntax
4. Use the schema to create a Model
5. Activate neData by calling neData.init(router, Model)


## POST

### Add a document to a collection

post request
- http://localhost:3001/api/people

where 
- people = name of the model/collection
- req.body = the document you want to add
- example req.body 

```json
{
  "firstName": "John",
  "lastName": "Jackson",
  "email": "john@jackson.com"
}
```

results 
- Adds the contents of the req.body as a document to the people collection using the mongoose schema.

comments
- Example post req with Json body using Postman.

![Post Example using postman](https://raw.githubusercontent.com/node-engine/ne-rest-mongoose/master/media/postman.png)


## GET 

### Get all in collection

get request
- http://localhost:3001/api/people

where 
- api = the apiPath you specified
- people = name of the model/collection

results 
- all documents in the people collection


### Limit the request to a a number of documents

get request
- http://localhost:3001/api/people?limit=3

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: limit = the number of documents you want

results 
- the first 3 documents in the people collection 


### Cycle through docs in the collection

get request 1
- http://localhost:3001/api/people?limit=3&batch=1

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: limit = the number number of documents in a cycle 
- query: batch = the cycle number

results 
- the 1st, 2nd and 3rd document in the collection

get request 2
- http://localhost:3001/api/people?limit=3&batch=2

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: limit = the number number of documents in a cycle 
- query: batch = the cycle number

results 
- the 4th, 5th and 6th document in the collection

get request 3
- http://localhost:3001/api/people?limit=3&batch=3

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: limit = the number number of documents in a cycle 
- query: batch = the cycle number

results 
- the 7th, 8th and 9th document in the collection


### Search for documents where a field matches a value

get request
- http://localhost:3001/api/people?f1=firstName&v1=John

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: f1 = the field you want to search by
- query: v1 = the value in the f1 filed you are looking to match

results 
- all documents in the people collection where the firstName field is John

comments 
- the search in case sensitive, so if you type john instead og Johh it will not find it.


### Get one document in a collection using the document _id

get request
- http://localhost:3001/api/people/55eefa231c0eba0d2c72af40

where 
- api = the apiPath you specified
- people = name of the model/collection
- 55eefa231c0eba0d2c72af40 = the _id of the document you want

results 
- The document with the _id of 55eefa231c0eba0d2c72af40


## PUT

### Search for documents where a field matches a value and give a new value to a field in those documents

put request
- http://localhost:3001/api/people?f1=firstName&v1=John&fs1=email&vs1=john@jackstrade.com

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: f1 = the field you want to search by
- query: v1 = the value in the f1 filed you are looking to match
- query: fs1 = the field you want to edit
- query: vs1 = the new value for the field you want to edit

results 
- all documents in the people collection where the firstName field is John gets given a new value of john@jackstrade.com for the email field

comments 
- the search in case sensitive, so if you type john instead og Johh it will not find it. 
- you can search by one field and edit another field
- if more than one document matches the search then all those documents will be updated
- By default only one document is edited if you want to edit all documents matching the query then at a query param called multi=yes (?multi=yes or &multi=yes) 


### Search for documents where a field matches a value and use a json request body object to update the fields

put request
- http://localhost:3001/api/people?f1=firstName&v1=John

where 
- api = the apiPath you specified
- people = name of the model/collection
- query: f1 = the field you want to search by
- query: v1 = the value in the f1 filed you are looking to match

results 
- all documents in the people collection where the firstName field is John

comments

- See the MongoDB docs on how to format the json req body (http://docs.mongodb.org/manual/reference/method/db.collection.update)
- By default only one document is edited if you want to edit all documents matching the query then at a query param called multi=yes (?multi=yes or &multi=yes) 

- for

```json

{
  "_id": "55eefa231c0eba0d6c72af40",
  "firstName": "John",
  "lastName": "Jackson",
  "email": "mail@mail.com",
  "detail": {
            "thing": "thing value"
          },
  "__v": 0,
  "createdAt": "Fri Sep 18 2015 17:09:51 GMT+0200 (SAST)"
}

```
- use this reg body object to define what to edit

```json

{
  "detail.thing": "new thing value",
  "email": "newmail@mail.com"
}
 
```

### Search for documents by _id and use a json request body object to update the fields

put request
- http://localhost:3001/api/people/55eefa231c0eba0d6c72af40

where 
- api = the apiPath you specified
- people = name of the model/collection
- 55eefa231c0eba0d6c72af40 = the _id of the document you want to edit

results 
- all documents in the people collection where the firstName field is John

comments

- See the MongoDB docs on how to format the json req body (http://docs.mongodb.org/manual/reference/method/db.collection.update)
- By default only one document is edited if you want to edit all documents matching the query then at a query param called multi=yes (?multi=yes or &multi=yes) 

- for

```json

{
  "_id": "55eefa231c0eba0d6c72af40",
  "firstName": "John",
  "lastName": "Jackson",
  "email": "mail@mail.com",
  "detail": {
            "thing": "thing value"
          },
  "__v": 0,
  "createdAt": "Fri Sep 18 2015 17:09:51 GMT+0200 (SAST)"
}

```
- use this reg body object to define what to edit

```json

{
  "detail.thing": "new thing value",
  "email": "newmail@mail.com"
}
 
 
```

## DELETE

### Remove a document from a collection using a field value combination

delate request
- http://localhost:3001/api/people?f1=firstName&v1=John

where 
- people = name of the model/collection
- api = the apiPath you specified
- query: f1 = the field you want to search by
- query: v1 = the value in the f1 filed you are looking to match

results 
- remove documents in the people collection where the firstName field is John

comments 
- the search in case sensitive, so if you type john instead og Johh it will not find it.


### Remove one document in a collection using the document _id

delete request
- http://localhost:3001/api/people/55eefa231c0eba0d2c72af40

where 
- people = name of the model/collection
- 55eefa231c0eba0d2c72af40 = the _id of the document you want to remove

results 
- The document with the _id of 55eefa231c0eba0d2c72af40 is removed


## License 

The MIT License (MIT)

Copyright (c) 2015 Bernard Hamann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.