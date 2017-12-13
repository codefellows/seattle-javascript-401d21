```javascript
let intersectArrays = (A,B) => {
	// vinicio - ignoring error checking
	let valuesFound = {};
	let intersection = [];
	for(let iA in A){ // O(n)
		valuesFound[A[iA]] = true;
	}
	for(let iB in B){
		if(valuesFound[B[iB]] === true)
			intersection.push(B[iB]);
	}
	return intersection;
};
```
