const JSON_RPC = require('../lib/json_rpc.js');

const rpc = new JSON_RPC();


console.log( rpc.call( 'test', [ 1, 2 ] ));
console.log( rpc.call( 'test', [ 1, 2 ] ));
console.log( rpc.call( 'test', [ 1, 2 ] ));
console.log( rpc.call( 'test', [ 1, 2 ] ));
console.log( rpc.call( 'test', [ 1, 2 ] ));


console.log( rpc.error( 4, 121, 'asdasda' ));
