const ipfsAPI = require('ipfs-api')

function readFileText(file, callback)
{
    let reader = new window.FileReader()
    reader.onloadend = () => callback(reader)
    reader.readAsText(file)
}

function submitFile(file, callback)
{
    let reader = new window.FileReader()
    reader.onloadend = () => saveToIpfs(reader, callback)
    reader.readAsArrayBuffer(file)
}

function submitJson(json, callback)
{
    let jsonString = JSON.stringify(json);
    const buffer = Buffer.from(jsonString);
    saveBuffer(buffer, callback);
}

function saveToIpfs(reader, callback) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    saveBuffer(buffer, callback);
}

function saveBuffer(buffer, callback)
{
    let ipfsApi = ipfsAPI('localhost', '5001')
    ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        ipfsId = response[0].hash
        console.log(ipfsId)
        if (callback) callback(null, ipfsId);
      }).catch((err) => {
        if (callback) callback(err, null);
      })
}

module.exports.submitFile = submitFile;
module.exports.submitJson = submitJson;