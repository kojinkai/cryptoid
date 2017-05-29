class CoinbaseApiService {

  constructor(baseUrl) {
    this.baseUrl = 'http://localhost:3001';
  }

  get(path) {

    const url = `${this.baseUrl}/${path}`

    const request = new Request(url, {
      method: 'GET'
    });

    return fetch(request);
  }

  getAccount() {
    return this.get('account');
  }
}

const coinbaseApi = new CoinbaseApiService();

export default coinbaseApi;
