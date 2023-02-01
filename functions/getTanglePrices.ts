import superagent from 'superagent'
import { ankr_getTokenPrice, params } from '../vars/index.js'
import { handleCatch, translate } from './index.js'

export async function getTanglePrices() {
    let reqs = params.map((params, id) => { return { id, ...ankr_getTokenPrice, params } })
    let res = await superagent.post('https://rpc.ankr.com/multichain').send(reqs).catch(handleCatch)
    return res['body'].map(
        (res: { result: { blockchain: string; usdPrice: string } }) => 
            `${translate(res.result.blockchain)}\t${parseInt((1 / parseFloat(res.result.usdPrice)).toString()).toLocaleString()}`)
    .join('\n')
    .replace(/\./g, '\\.')
}