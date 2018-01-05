const ipfsAPI = require('ipfs-api')
const pandoraMarketContract = require('../pyrrha-abi/PandoraMarket.json');
const kernelContract = require('../pyrrha-abi/Kernel.json');
require("./ui");

var currentFile

document.addEventListener('DOMContentLoaded', function(){ 
    var fileChooser = document.getElementById("exampleInputFile");
    fileChooser.addEventListener("change", captureFile, false);

    var kernelForm = document.getElementById("kernelForm");
    kernelForm.addEventListener("submit", submitFile);
    console.log("kernelForm");
    console.log(kernelForm);
});

function captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    file = event.target.files[0]
}

function submitFile(event)
{
    event.preventDefault(); //do not refresh

    let reader = new window.FileReader()
    reader.onloadend = () => saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
}

function saveToIpfs(reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    
    ipfsApi = ipfsAPI('localhost', '5001')
    ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        saveToBlockchain(ipfsId);
      }).catch((err) => {
        console.error(err)
      })
}

function saveToBlockchain(ipfsId)
{ 
    if (typeof web3 === 'undefined')
    {
        console.log("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
        return;
    }

    let gasEstimate = web3.eth.estimateGas({data: kernelContract.bytecode}, 
        (err, gasEstimate) => onGasEstimated(err, gasEstimate, ipfsId)    
    ); 
}

function onGasEstimated(err, gasEstimate, kernelIpfsId)
{
    let newKernelContract = web3.eth.contract(kernelContract.abi);
    console.log("kernelConstructor");
    console.log(newKernelContract);
    let bytecode = kernelContract.bytecode;

    console.log("gas estimate: " + gasEstimate);
    let mySenderAddress = web3.eth.coinbase; 
    console.log("my address "+ mySenderAddress);
    newKernelContract.new(kernelIpfsId,
        {from: mySenderAddress,
         data: bytecode,
         gas: gasEstimate},
        onKernelConstructed); 
}
 
function onKernelConstructed(err, constructedKernel)
{    
    if (!err)
    { 
        console.log("kernel constructed");
        console.log(constructedKernel);
        console.log("with address");
        console.log(constructedKernel.address);

        //this callback may fire twice
        if(!constructedKernel.address)
        {
            console.log(constructedKernel.transactionHash)
            web3.eth.getTransactionReceipt(constructedKernel.transactionHash, onContructedKernelAddressReceived);
        }
    }
    else
    {
        console.log("Smart contract call failed: " + err);
    }
}

function onContructedKernelAddressReceived(err, transactionInfo)
{
    const pandoraMarketAddress = '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6';
    
    const address = transactionInfo.contractAddress;
    console.log("onContructedKernelAddressReceived");
    console.log(address);
    let pandoraMarket = web3.eth.contract(pandoraMarketContract.abi).at(pandoraMarketAddress);
    pandoraMarket.addKernel(address, function (err, result)
    {
        if (err)
            console.log("Smart contract call failed: " + err);
        console.log("Kernel with address " + address + " added to the registry.");
    });
}
