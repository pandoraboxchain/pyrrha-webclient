const pandoraMarketContract = require('../pyrrha-abi/PandoraMarket.json');
const datasetContract = require('../pyrrha-abi/Kernel.json');
var Config = require("../config/config");
var IpfsHelper = require("./ipfs_helper")
var ContractConstructor = require("./contract_constructor")

var price;
var sample_count;
var dimension;

document.addEventListener('DOMContentLoaded', function()
{
    if (typeof web3 === 'undefined')
    {
        console.log("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
        return;
    }

    var jsonFileChooser = document.getElementById("dataJsonInputFile");
    jsonFileChooser.addEventListener("change", captureJson, false);

    var datasetForm = document.getElementById("datasetForm");
    datasetForm.addEventListener("submit", checkIfReadyAndUpload);
});

function captureJson(event)
{
    event.stopPropagation()
    event.preventDefault()
    json = event.target.files[0]
}

function checkIfReadyAndUpload(event)
{
    event.preventDefault();
    if (json)
    {
        IpfsHelper.submitJson(json, onJsonUploaded);        
    }
}

function onJsonUploaded(err, ipfsId)
{
    console.log("json ipfs id " + ipfsId);
    if (!err)
    {
        saveToBlockchain(ipfsId);
    }
    else console.log(err);
}

function saveToBlockchain(ipfsId)
{
    let params = [ipfsId, dimension, sample_count, price];
    ContractConstructor.constructWithParams(datasetContract, params, function(err, transaction)
    {
        const address = transaction.contractAddress;
        console.log("onContructedKernelAddressReceived");
        console.log(address);
        let pandoraMarket = web3.eth.contract(pandoraMarketContract.abi).at(Config.pandoraMarketAddress);
        pandoraMarket.addDataset(address, function (err, result)
        {
            if (err)
                console.log("Smart contract call failed: " + err);
            console.log("Kernel with address " + address + " added to the registry.");
        });
    });
}