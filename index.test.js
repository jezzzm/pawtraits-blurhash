const assert = require('assert').strict;
const { handler: generateBlurHash } = require('./index');

const testEvent = {
  data: {
    imageUrl: 'https://images.ctfassets.net/rdfsjfezcqx3/5l0qX4hVMXah5quopdCY16/92b05e4a8075f3e7eecc583a33324414/_Ambassadog__George_-_Sydney_Pawtraits_.jpg?h=250'
  },
};

const main = async () => {
  const response = await generateBlurHash(testEvent);
  
  const expectedResponse = {
    statusCode: 200,
    body: JSON.stringify({ blurHash: 'UxNAhzV@~qozM{ofWBRj_3kCMxof%Moft7a|' })
  }
  try {
    assert.deepStrictEqual(response, expectedResponse);
    return console.log('Response was good!')
  } catch (err) {
    console.error('Response not equal!', err)
  }
}

main();