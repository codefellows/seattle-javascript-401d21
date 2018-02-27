#Lab 31 Redux


in this app a category should contain at least the following properties
id a uuid
timestamp a date from when the category was created
name a string that is the name of the category
budget a number that is the total amount of $ in the category
feel free to add more to your categories

Dashboard Component
should be displayed on the / route
should use react-redux's connect to map state and dispatchable methods to props
should display a CategoryForm for adding categories to the app state
should display a CategoryItem for each category in the app state
CategoryForm Component
should expect an onComplete prop to be a function
that function should be invoked with the CategoryForms state when the form is submitted
should expect a buttonText prop to configure the submit buttons text
should support an optional category prop that will initialize the state of the form
CategoryItem Component
should display the category's name and budget
should display a delete button
onClick the category should be removed from the application state
should display a CategoryForm
onComplete the form should update the component in the application state

## Installing
```
npm install
```
This will install the required depencencies

## Running the application
```
npm run watch
```
This will start the webpack dev server so that the app has a build.

Then you can go to 
```
http://localhost:8080/
```
in the web browser. This will display the app.

## Testing
There is no testing at this time.









## Authors

* **Roger Davenport** - *RND* 



## License

This project is licensed under the MIT License - 

## Acknowledgments

* Scott Schmidt
* Google
*