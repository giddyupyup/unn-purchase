import web3 from 'web3';

//
const getWeb3 = () => {
  return new web3(web3.givenProvider || 'http://localhost:7545');
};

const getBN = (number) => {
  return new web3.utils.BN(number);
};

const toWei = (number, unit) => {
  return web3.utils.toWei(number.toString(), unit);
};

const fromWei = (number, unit) => {
  return web3.utils.fromWei(number.toString(), unit);
};

export { getWeb3, getBN, toWei, fromWei };
