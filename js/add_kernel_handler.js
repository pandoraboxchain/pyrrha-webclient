const pandoraMarketContract = require('../pyrrha-abi/PandoraMarket.json');
const kernelContract = require('../pyrrha-abi/Kernel.json');
require("./ui");
var Config = require("../config/config");
var IpfsHelper = require("./ipfs_helper")
var ContractConstructor = require("./contract_constructor")

var json
var model
var weights
var dimension
var complexity
var price

document.addEventListener('DOMContentLoaded', function()
{
    if (typeof web3 === 'undefined')
    {
        console.log("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
        return;
    }

    var modelFileChooser = document.getElementById("modelInputFile");
    modelFileChooser.addEventListener("change", captureModel, false);

    var weightsFileChooser = document.getElementById("weightsInputFile");
    weightsFileChooser.addEventListener("change", captureWeights, false);

    var kernelContructor = document.getElementById("kernelContructor");
    kernelContructor.addEventListener("submit", checkIfReadyAndUpload);

    var jsonFileChooser = document.getElementById("jsonInputFile");
    jsonFileChooser.addEventListener("change", captureJson, false);

    var kernelForm = document.getElementById("kernelForm");
    kernelForm.addEventListener("submit", captureJson);
});

function captureJson(event)
{
    event.stopPropagation()
    event.preventDefault()
    jsonFile = event.target.files[0]
    IpfsHelper.submitFile(jsonFile, onJsonUploaded);
}

function captureModel(event)
{
    event.stopPropagation();
    event.preventDefault();
    let modelFile = event.target.files[0];
    IpfsHelper.submitFile(modelFile, function(err, ipfsId)
    {
        model = ipfsId;
    });
}

function captureWeights(event)
{
    event.stopPropagation();
    event.preventDefault();
    let weightsFile = event.target.files[0];
    IpfsHelper.submitFile(weightsFile, function(err, ipfsId)
    {
        weights = ipfsId;
    });
}

function checkIfReadyAndUpload(event)
{
    event.preventDefault();
    if (model && weights)
    {
        let json = {"model": model,
                    "weights": weights};
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
    let params = [ipfsId, dimension, complexity, price];
    ContractConstructor.constructWithParams(kernelContract, params, function(err, transaction)
    {
        const address = transaction.contractAddress;
        console.log("onContructedKernelAddressReceived");
        console.log(address);
        let pandoraMarket = web3.eth.contract(pandoraMarketContract.abi).at(Config.pandoraMarketAddress);
        pandoraMarket.addKernel(address, function (err, result)
        {
            if (err)
                console.log("Smart contract call failed: " + err);
            console.log("Kernel with address " + address + " added to the registry.");
        });
    });
}