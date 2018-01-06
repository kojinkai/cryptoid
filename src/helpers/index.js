// @flow

const currencyMap = new Map()
currencyMap.set('BTC', 'Bitcoin');
currencyMap.set('ETH', 'Ethereum');
currencyMap.set('LYC', 'Litecoin');
currencyMap.set('ALL', 'All');

export const getPrettyCurrencyFromCode = (code: string): string => currencyMap.get(code);
export const fixFloat = (floatingNumber: number): number => Number((floatingNumber).toFixed(2));