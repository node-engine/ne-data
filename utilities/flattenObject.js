var flattenObject = function(ob) {
    var self = this;

    var toReturn = {};
    var flatObject;
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) {
            continue;
        }
        if ((typeof ob[i]) === 'object') {
            flatObject = self.flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }
                toReturn[i + (!!isNaN() ? '.' + x : '')] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

module.exports = flattenObject;

/*

 flatten object sources:

 https://gist.github.com/penguinboy/762197
 https://gist.github.com/gdibble/9e0f34f0bb8a9cf2be43

 */