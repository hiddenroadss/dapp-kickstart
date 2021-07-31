import web3 from './web3';
import CampaignFactory from './build/contracts/CampaignFactory.json';

const contract = new web3.eth.Contract(CampaignFactory.abi, '0xbA3f08a5Ebb7CF32545352C9B131e8f71D07dE92');

export default contract;
