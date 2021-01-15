const Web3 = require("web3")
const saleContractAbi = require("../../contracts_abi/UnionProtocolTokenSale.json")

const web3 = new Web3(process.env.INFURA_URL)
const saleContract = new web3.eth.Contract(saleContractAbi, process.env.SALE_CONTRACT_ADDRESS)
let nonce = 0

web3.eth.accounts.wallet.clear()
web3.eth.accounts.wallet.add(process.env.WALLET_PRIVATE_KEY)

const addToPermittedList = async (address, isApproved, isPrecheck, amount, nonce) => {
    console.log(nonce)
    return saleContract.methods.addToPermittedList(address, isApproved, isPrecheck, amount).send({
        from: web3.eth.accounts.wallet[0].address,
        gas: 100000,
        nonce: nonce
    })
}

const removeFromPermittedList = (address, nonce) => {
    return saleContract.methods.removeFromPermittedList(address).send({
        from: web3.eth.accounts.wallet[0].address,
        gas: 50000,
        nonce: nonce
    })
}

const getAddressPermittedApprovalStatus = (address) => {
    return saleContract.methods.getAddressPermittedApprovalStatus(address).call()
}

const getAddressPermittedPrecheck = (address) => {
    return saleContract.methods.removeFromPermittedList(address).call()
}

const getNonce = async ()=>{
    if(nonce === 0){
        nonce = await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address)
    }
    return nonce++
}

module.exports = {
    addToPermittedList,
    removeFromPermittedList,
    getAddressPermittedApprovalStatus,
    getAddressPermittedPrecheck,
    getNonce
}