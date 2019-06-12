'use strict';

const TimedPromise = require('liqd-timed-promise');
const UniqueID = require('liqd-unique-id');

function Message( json_rpc, headers )
{
    return headers ? Object.assign( headers, json_rpc ) : json_rpc;
}

const JSON_RPC_Message = module.exports = class JSON_RPC_Message
{
    constructor( handler )
    {
        this._handler = handler;
        this._id_generator = new UniqueID();
        this._calls = new Map();
    }

    call( method, params, headers = undefined )
    {
        const id = this._id_generator.get();

        return (
        {
            message: Message({ jsonrpc: '2.0', id, method, params }, headers ),
            result: new TimedPromise(( resolve, reject, timeout ) =>
            {
                this._calls.set( id, { resolve, reject, deadline: Date.now() + timeout });
            })
        });
    }

    emit( method, params, headers = undefined )
    {
        return { message: Message({ jsonrpc: '2.0', method, params }, headers )};
    }

    static result( id, result, headers = undefined )
    {
        return { message: Message({ jsonrpc: '2.0', id, result }, headers )};
    }

    result( id, result, headers = undefined ){ return JSON_RPC.result( id, result, headers ); }

    static error( id, code, message, headers = undefined )
    {
        return { message: Message({ jsonrpc: '2.0', id, error: { code, message }}, headers )};
    }

    error( id, code, message, headers = undefined ){ return JSON_RPC.error( id, code, message, headers ); }
}
