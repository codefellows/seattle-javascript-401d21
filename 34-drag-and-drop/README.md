![cf](http://i.imgur.com/7v5ASc8.png) 34: Drag and Drop 
===

## Learning Objectives
* Students will learn to utilize the html5 Drag and Drop API

## Readings
* [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Drag and Drop
Browsers now nativly implment drag and drop! 
#### dragable attribute
To make a component dragable it needs a `dragable` attribute. Dragable elements will triger the drag and drop api events.

``` html
<div id='todo-item-01' dragable>
  <p> cool beans </p>
</div>
```

#### Events 
There are many drag events `onDrag`, `onDrop`, `onDragStart`, `onDragEnd`, `onDragEnter`, `onDragLeave`, `onDragOver`, `onDragExit`.
When an item is dragable you can store data on its onDragStart event, to be handled onDrop on the `dropzone`.

#### DataTransfer 
Drag events have a dataTransfer propery that can hold data. Its a great idea to store data here during an onDragStart event on the dragable item. dataTransfer data must be encoded unicode data with MIME types like 'text/plain', 'text/html', 'application/json', ect. 
``` javascript

document.getElementById('todo-item-01')
.addEventListener('dragstart', () => {
  e.dataTransfer.setData('application/json', JSON.stringify(someData))
})
```

#### Dropzone
Dropzone is the term used to describe a element where dragable elements can be droped. To create a dropzone an element it must implament an `onDragOver` handler and `onDropHandler`.

``` html
<div id='todo-list'> <div>
```
``` javascript
let todoList = document.getElementById('todo-list')

todoList.addEventListener('dragover', (e) => e.preventDefault())
todoList.addEventListener('drop', (e) => {
  e.prventDefault()
  try {
    let someData = JSON.stringify(e.dataTransfer.getData('application/json'))
    // handle drop success
  } catch (err){
    // handle error
  }
})
```








