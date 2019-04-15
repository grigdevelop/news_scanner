import * as express from 'express';
import { BtcMarket } from './btcMarket';

const router = express.Router();

router.get('/', ( request: express.Request, response: express.Response) => {
    const markets: BtcMarket[] = [
        {coin: 'Ethereum', pair: 'ETH/BTC', pricePrc: 0.034, priceUSD: 178.69},
        {coin: 'Bitcoin Cash ABC', pair: 'BCHABC/BTC', pricePrc: 0.059, priceUSD: 306.51},
        {coin: 'Binance coin', pair: 'BNB/BTC', pricePrc: 0.034, priceUSD: 178.69}
    ];
    response.send(markets);
});

router.get('/ui', (request: express.Request, response: express.Response) => {
   response.render(`btc-markets\\views\\index`);
});

export default router;