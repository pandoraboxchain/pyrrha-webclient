function constructWithParams(contract, params, callback)
{
    web3.eth.estimateGas({data: contract.bytecode}, 
        (err, gasEstimate) => onGasEstimated(err, gasEstimate, contract, params, callback));
}

function onGasEstimated(err, gasEstimate, contract, params, callback)
{
    let contractInterface = web3.eth.contract(contract.abi);

    contractInterface.new(...params,
        {from: web3.eth.coinbase,
        data: contract.bytecode,
        gas: gasEstimate},
        (err, contract) => onContractConstructed(err, contract, callback));
}
 
function onContractConstructed(err, contract, callback)
{    
    if (!err)
    { 
        //this callback may fire twice
        if(!contract.address)
        {
            console.log("created contract with hash");
            console.log(contract.transactionHash)
            web3.eth.getTransactionReceipt(contract.transactionHash, callback);
        }
    }
    else
    {
        console.log("Smart contract call failed: " + err);
    }
}

module.exports.constructWithParams = constructWithParams;
