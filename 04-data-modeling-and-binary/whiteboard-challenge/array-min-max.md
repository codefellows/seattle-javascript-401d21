write a ```function (array) => {...}``` that returns an object literal with the following format.

```
{
	min : <minimum value in the array>,
	max : <maximum value in the array>,
	average : <average value in the array> --> Optional
}
```

Comment: Ideally, this would be done with one traversal.

NOTES 
* You can't use any Array prototype method (or another library) in your solution. except .length property

* You can also assume that the array will contain only numbers.


```
let findMinMax = (array) => {
	if(!Array.isArray(array))
		return {};
	if(array.length === 0)
		return {};
	//vinicio - this might not be neccesary
	if(array.length === 1)
		return { max : array[0],min : array[0]};
	let min = array[0];
	let max = array[0];
	for(let value in array){
		if(array[value] > max)
			max = array[value];
		if(array[value] < min)
			min = array[value];
	}
	// return {min,max};
	return {'min' : min,
		'max' : max
		};
};
let minMax = findMinMax([....]);
```
