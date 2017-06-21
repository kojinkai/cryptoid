import React from 'react';
import ReactDOM from 'react-dom';
import Aggregator from './aggregator';

const buys = {
  "pagination": {
    "ending_before": null,
    "starting_after": null,
    "limit": 25,
    "order": "desc",
    "previous_uri": null,
    "next_uri": null
  },
  "data": [
    {
      "id": "5cc5e1fc-a5d6-594b-b562-dccb952321f5",
      "status": "completed",
      "payment_method": {
        "id": "2494924e-37db-5f45-96e6-f106701fde9e",
        "resource": "payment_method",
        "resource_path": "/v2/payment-methods/2494924e-37db-5f45-96e6-f106701fde9e"
      },
      "transaction": {
        "id": "4bbf4aec-6270-52fa-b083-5f8360e39ff0",
        "resource": "transaction",
        "resource_path": "/v2/accounts/a1671f2b-19c2-570c-be22-f71062d93594/transactions/4bbf4aec-6270-52fa-b083-5f8360e39ff0"
      },
      "created_at": "2017-05-03T12:39:31Z",
      "updated_at": "2017-05-03T12:39:53Z",
      "resource": "buy",
      "resource_path": "/v2/accounts/a1671f2b-19c2-570c-be22-f71062d93594/buys/5cc5e1fc-a5d6-594b-b562-dccb952321f5",
      "fees": [
        {
          "type": "coinbase",
          "amount": {
            "amount": "4.62",
            "currency": "GBP"
          }
        },
        {
          "type": "bank",
          "amount": {
            "amount": "0.00",
            "currency": "GBP"
          }
        }
      ],
      "amount": {
        "amount": "0.10000000",
        "currency": "BTC"
      },
      "total": {
        "amount": "120.44",
        "currency": "GBP"
      },
      "subtotal": {
        "amount": "115.82",
        "currency": "GBP"
      },
      "committed": true,
      "payout_at": "2017-05-04T12:39:30Z",
      "instant": true,
      "requires_completion_step": true
    }
  ]
};

const account = {
  "data": {
    "id": "a1671f2b-19c2-570c-be22-f71062d93594",
    "name": "BTC Wallet",
    "primary": true,
    "type": "wallet",
    "currency": "BTC",
    "balance": {
      "amount": "0.10000000",
      "currency": "BTC"
    },
    "native_balance": {
      "amount": "198.98",
      "currency": "GBP"
    },
    "created_at": "2016-05-02T10:51:20Z",
    "updated_at": "2017-05-03T12:39:53Z",
    "resource": "account",
    "resource_path": "/v2/accounts/a1671f2b-19c2-570c-be22-f71062d93594"
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Aggregator
    account={account}
    buys={buys}
    isLoading={ false } />, div);

});
