var _ = require("lodash");
var flattenObject = require('./flattenObject');

var buildFormFields = function(dataName, object, dataRef, options){

    console.log('');
    console.log('');
    console.log('buildEditFields dataName');
    console.log(dataName);
    console.log('buildEditFields object');
    console.log(object);
    console.log('');
    console.log('');

    var flatObject = flattenObject(object);

    console.log('');
    console.log('');
    console.log('buildEditFields flatObject');
    console.log(flatObject);
    console.log('');
    console.log('');


    var dataRefIndex = _.findIndex(dataRef, function(chr) {
        return chr.name == dataName;
    });

    console.log('');
    console.log('');
    console.log('buildEditFields flatObject');
    console.log(flatObject);
    console.log('buildEditFields dataRefIndex');
    console.log(dataRefIndex);
    console.log('');
    console.log('');


    var fields = [];

    dataRef[dataRefIndex].fields.forEach(function(field, index2){

        console.log('');
        console.log('');
        console.log('buildEditFields options.editGroup');
        console.log(options.editGroup);
        console.log('buildEditFields field.editGroup');
        console.log(field.editGroup);
        console.log('');
        console.log('');

        if(options.editGroup && field.editGroup === "undefined"){

            console.log('');
            console.log('');
            console.log("buildEditField: Field skipped because not in current editGroup");
            console.log('buildEditField: Field:');
            console.log(field);
            console.log('');
            console.log('');

        }
        else if(options.editGroup && field.editGroup !== options.editGroup){

            console.log('');
            console.log('');
            console.log("buildEditField: Field skipped because not in current editGroup");
            console.log('buildEditField: Field:');
            console.log(field);
            console.log('');
            console.log('');

        }
        else{

            if(options && options.noEdit && options.noEdit  === true){

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label',
                        {},
                        field.data
                    ),
                    element(
                        'br',
                        {}
                    ),
                    element(
                        "label",
                        {},
                        flatObject[field.data]
                    ),
                    element(
                        'br',
                        {}
                    )
                ))

            }

            else if(field.editType && field.editType === "noEdit"){

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label',
                        {},
                        field.data
                    ),
                    element(
                        'br',
                        {}
                    ),
                    element(
                        "label",
                        {},
                        flatObject[field.data]
                    ),
                    element(
                        'br',
                        {}
                    )
                ))

            }

            else if(field.editType && field.editType === "select"){

                var selectOptions = field.selectOptions.map(function(option, index3){

                    return element(
                        "option",{value: option, key: index3},
                        option
                    )

                });

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label + ": "
                    ),
                    element(
                        "label", {},
                        flatObject[field.data]
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "select", { type: "text", name: field.data, defaultValue: flatObject[field.data]},
                        selectOptions
                    ),
                    element(
                        'br', {}
                    )
                ))


            }

            else if(field.editType && field.editType === "textarea"){


                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "textarea",
                        {name: field.data},
                        flatObject[field.data]
                    ),
                    element(
                        'br', {}
                    )
                ))

            }

            else{

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "input",
                        {type: "text", name: field.data, defaultValue: flatObject[field.data]}
                    ),
                    element(
                        'br', {}
                    )

                ))

            }

        }

    });

    console.log('');
    console.log('');
    console.log('buildEditFields fields');
    console.log(fields);
    console.log('');
    console.log('');

    return fields

};

module.exports = buildFormFields;