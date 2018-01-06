const baseUrl = 'http://localhost:3001';

const get = path => {

  const url = `${this.baseUrl}/${path}`

  const request = new Request(url, {
    method: 'GET'
  });

  return fetch(request);
};

const coinbaseApi = {

  getAccounts() {
    return get('account');
  },

  getAccountPurchasesByID(id) {
    return get(`account/${id}/buys`);
  }
}

export default coinbaseApi;
