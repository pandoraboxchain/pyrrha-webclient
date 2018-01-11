const pandoraMarketContract = require('../pyrrha-abi/PandoraMarket.json');
const datasetContract = require('../pyrrha-abi/Dataset.json');
var Config = require("../config/config");
var IpfsHelper = require("./ipfs_helper")
var ContractConstructor = require("./contract_constructor")

var json;
var price;
var sampleCount;
var dimension;

var datasetConstructor;

function isConstructorPage()
{
    //if contructor page is not hidden
    return !datasetConstructor.parentNode.classList.contains("d-none");
}

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
    datasetForm.addEventListener("submit", (event) => checkIfReadyAndUpload(event, false));
    
    datasetConstructor = document.getElementById("datasetContructor");
    datasetConstructor.addEventListener("submit", (event) => checkIfReadyAndUpload(event, true));
});

function captureJson(event)
{
    event.stopPropagation()
    event.preventDefault()
    json = event.target.files[0]
}

function parseInputFields(isConstructorPage)
{
    var elementSuffix = isConstructorPage ? "Constructor" : "";

    price = document.getElementById('inpPriceDataset' + elementSuffix).value;
    sampleCount = document.getElementById('inpSamplesCountDataset' + elementSuffix).value;
    dimension = document.getElementById('inpDataDimensionDataset' + elementSuffix).value;
}

function checkIfReadyAndUpload(event, isConstructorPage)
{
    event.preventDefault();

    parseInputFields(isConstructorPage);

    console.log("check if ready and upload");
    console.log(price)
    console.log(sampleCount)
    console.log(dimension)

    if (json)
    {
        uploadJson();
        return;
    }
    else
    {
        var selectedFilesCount = 0;
        var ipfsIdList = [];
        var batchFiles = document.getElementsByClassName("dataset-input-file");
        for (index in batchFiles)
        {
            var selectedFiles = batchFiles[index].files;
            var file = selectedFiles ? selectedFiles[0] : null;
            if (file)
            {
                selectedFilesCount++;
                IpfsHelper.submitFile(file, function(err, ipfsId)
                {
                    selectedFilesCount--;
                    ipfsIdList.push(ipfsId);
                    if (selectedFilesCount == 0)
                    {
                        formJson(ipfsIdList);
                        uploadJson();
                    }
                });
            }
        }
    }
}

function formJson(ipfsIdList)
{
    json = { "batches": ipfsIdList };
    console.log(json);
}

function uploadJson()
{
    IpfsHelper.submitJson(json, onJsonUploaded);  
}

function onJsonUploaded(err, ipfsId)
{
    console.log("json ipfs id " + ipfsId);
    if (!err)
    {
        json = null;
        saveToBlockchain(ipfsId);
    }
    else console.log(err);
}

function saveToBlockchain(ipfsId)
{
    let params = [ipfsId, dimension, sampleCount, price];
    ContractConstructor.constructWithParams(datasetContract, params, function(err, transaction)
    {
        const address = transaction.contractAddress;
        console.log("onContructedContractAddressReceived");
        console.log(address);
        let pandoraMarket = web3.eth.contract(pandoraMarketContract.abi).at(Config.pandoraMarketAddress);
        pandoraMarket.addDataset(address, function (err, result)
        {
            if (err)
            {
                console.log("Smart contract call failed: " + err);
                return;
            }
            console.log("Dataset with address " + address + " added to the registry.");
            setDatasetAddress(address);
        });
    });
}

function setDatasetAddress(address)
{
    let resultId = isConstructorPage() ? "datasetConstructorResultAlert" : "datasetResultAlert";
    let resultLabelId =  isConstructorPage() ? "datasetConstructorResultLabel" : "datasetResultLabel";
    document.getElementById(resultId).hidden = false;
    document.getElementById(resultLabelId).innerHTML = address;
}