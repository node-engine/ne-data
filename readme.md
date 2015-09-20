# ne-data (Node Engine Data)

A tool to request data from api's for pages using the Node Engine methodology

## Get meta for handler

```js

var meta = neData.meta(req, appConfig);

```

## Get pre render data from api's 

```js

neData.before(meta)
    .then(function(data) {
        renderPage(data);
    });
    
```

## Cycle (Not yet implimented)

Use the query params of the url to get batches of the data and then cycle through the batches 

on the client (update dom)

```js 

neData.cycleAfter(meta)
    .then(function(data) {
        updateState(data);
    });

```


on the server (re render)

```js 

neData.cycleAfter(meta)
    .then(function(data) {
        renderPage(data);
    });

```

## Get data to update state after page has rendered (Not yet implimented)

Get data to update state after page has rendered

on the client (update dom)

neData.after(meta)
    .then(function(data) {
        updateState(data);
    });
    
on the server (re render)

neData.after(meta)
    .then(function(data) {
        renderPage(data);
    });

