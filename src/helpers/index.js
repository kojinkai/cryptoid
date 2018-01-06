const currencyMap = new Map()
currencyMap.set('BTC', 'Bitcoin');
currencyMap.set('ETH', 'Ethereum');
currencyMap.set('LYC', 'Litecoin');
currencyMap.set('ALL', 'All');

export const getPrettyCurrencyFromCode = code => currencyMap.get(code);
