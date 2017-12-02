write a function (array) => {...} that returns an object literal with the following format.

{
	biggest : <maximum value in the array>,
	seccondBiggest : < the second biggest value in the array>
}


Comment: Ideally, this would be done with one traversal.

NOTES

You can't use any Array prototype method (or another library) in your solution. except .length property

You can also assume that the array will contain only numbers.

//EXTRA - If you are done. Implement yesterday's and today's function using all of 
Javascript's power.

```
(array) => {
	if(!array.isArray(array))
		return null;
	if(array.length < 2)
		return null;
	let biggest = Math.max(array[0],array[1]);
	let seccondBiggest = Math.min(array[0],array[1]);

	for(int i = 2; i < array.length; i++){
		if(array[i] >= biggest){
			secondBigest = biggest);
			biggest = array[i];
		else if(array[i] > seccondBiggest)
			seccondBiggest = array[i];
		}
	} 
	return {biggest,secondBiggest};
} 
```
