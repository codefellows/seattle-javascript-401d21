// vinicio - there are many ways to create a promise
// vinicio - resolve will map to the next 'then'
//           reject will map to the next catch
// let createPromise = () => new Promise((resolve,reject) => {
//   //resolve('Im am a value');
//   throw new Error('I am an error than was thrown');
// });

// Promise.resolve('I am another value')
//   .then(valueChain => console.log(`SUCCESS : ${valueChain}`))
//   .catch(valueChain => console.log(`ERROR : ${valueChain}`));

// createPromise()
//   .then(valueChain => console.log(`SUCCESS : ${valueChain}`))
//   .catch(valueChain => console.log(`ERROR : ${valueChain}`));

// createPromise()
//   .then(valueChain => console.log(`SUCCESS : ${valueChain}`))
//   .catch(valueChain => console.log(`ERROR : ${valueChain}`));

Promise.resolve(2)
  .then(valueChain => {
    throw new Error('mario');
    // console.log(`Line 24. valueChain = ${valueChain}`);
    // return 'mario';
  })// vinicio - then is returning a new promise for the flow
  .catch(valueChain => {
    console.log(`I AM AN ERROR ON LINE 28 ${valueChain}`);
    return 'catherine';
  })
  .then(valueChain => {
    console.log(`Line 31. valueChain = ${valueChain}`);
    return 'peach';
  })
  .then(valueChain => {
    console.log(`Line 31. valueChain = ${valueChain}`);
    return 'after the first catch';
  })
  .catch(valueChain => {
    console.log(`IM AM ERROR!!!! ${valueChain}`);
  });
