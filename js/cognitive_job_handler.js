const pandoraHooksContract = require('../pyrrha-abi/PandoraHooks.json');
var Config = require("../config/config");

var datasetIpfsId;
var kernelIpfsId;

document.addEventListener('DOMContentLoaded', function()
{
    if (typeof web3 === 'undefined')
    {
        console.log("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
        return;
    }

    var cognitiveJobForm = document.getElementById("cognitiveJobForm");
    cognitiveJobForm.addEventListener("submit", checkIfReadyAndUpload);
});

function checkIfReadyAndUpload(event)
{
    event.preventDefault();
    const kernel = document.getElementById('cognitiveJobKernel').value;
    const dataset = document.getElementById('cognitiveJobDataset').value;
    createCognitiveJob(kernel,dataset);
}

function createCognitiveJob(kernel, dataset)
{
    let pandoraHooks = web3.eth.contract(pandoraHooksContract.abi).at(Config.pandoraHooksAddress);
    console.log(pandoraHooksContract.abi);
    console.log(Config.pandoraHooksAddress);
    pandoraHooks.createCognitiveJob(kernel, dataset, function (err, result)
    {
        if (err)
            console.log("Create cognitive job failed: " + err);
        console.log("Cognitive job created!");
    });
}