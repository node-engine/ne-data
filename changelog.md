# ne-data changelog

## Change Tags

Feature
- NF New feature: Added a new feature

Bug
- BF Bug fix: Fixed a bug

Optimisation
- OO Optimisation: The internal workings of the module is improved 
- OR Refactor: The internal code is refactored

Change
- CI Input change: What is required as input for the module is changed
- CO Output change: What is output by the module is changed

Dependencies
- DN New Dependency: A new dependency is added to the package
- DR Remove Dependency: A  dependency is removed from the package
- DU Update Dependency: A dependency is updated in the package


## 1.9.3

Release date: 20151028

[FN] buildFormFields(dataName, object, dataRef, options)
- Adding a utility to generate the form field code in handlers
- dataName = the name of the model in the database
- object =  the object whose fields you want to generate the edit form fields for
- dataRef = the complete dataRef object, the dataName is used to find the dataRef for this object
- options.noEdit = if present and set to true then all the generated field will not be editable
- options.editGroup = can specify to only generate fields for a specific editGroup
- fields in the dataRef can be given editGroup names. Example editGroup: "anything"
- each field has a className of "ne-data-field-" + dataName

Code Snippet inside a handler

```js

var objectForFields = self.props.data.application[0];
var dataRef = self.props.dataRef;
var noEdit;
if(self.props.data.application[0] && self.props.data.application[0].status && self.props.data.application[0].status === "completed"){
    noEdit = true
}
else{
    noEdit = false
}

applicationForCurrentUser = element(
    "form", {action: "/data-alt/applications/edit", method: "post"},
    buildEditFields("applications", objectForFields, dataRef, {editGroup:"student", noEdit: noEdit}),
    element(
        "input",
        { type: "submit" , value: "Go"}
    )
);

```


## 1.9.2

Release date: 20151021

Removed 1.9.0
- Caused too many bugs


## 1.9.1

Release date: 20151020

Fixes bugs caused by 1.9.0


## 1.9.0

Release date: 20151020

All require statements (BF DN)
- When using ne-auto the require statements did not find the module
- Are now conditional to be compatible with ne-auto
- If there is a process.env.NE_AUTO then the require statements use the ne-auto if not then they require from root
- Now this module will work with ne-auto and without ne-auto
- DN tag because this is connected to dependencies 