```javascript
let intersectArrays = (A,B) => {
	// ignore checking right now

	let intersection = [];

	for(let iA in A){
		if(B.findIndex(x => x === A[iA]) >= 0){
			intersection.push(A[iA];
		}
	}
	return intersection;
};
```
