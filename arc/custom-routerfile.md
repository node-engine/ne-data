
router.get('/', function (req, res){

    mongooseRest.get(req, res, Model);

});

router.get('/:_id', function (req, res){

    mongooseRest.getById(req, res, Model);

});

router.delete('/', function (req, res){

    mongooseRest.delete(req, res, Model);

});

router.delete('/:_id', function (req, res){

    mongooseRest.deleteById(req, res, Model);

});

router.put('/', function (req, res){

    mongooseRest.put(req, res, Model);

});

router.put('/:_id', function (req, res){

    mongooseRest.putById(req, res, Model);

});

router.post('/', function (req, res){

    var obj = req.body;
    obj.createdAt = new Date();

    mongooseRest.post(req, res, Model, obj);

});