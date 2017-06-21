import React, { Component } from 'react';

class Indicator extends Component {

  render() {
    const indicator = this.props.inProfit ?
      (
        <svg className={this.props.className} width="23" height="13" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
          <title>
            Loss Indicator
          </title>
          <path d="M10.734.715l8.624 8.69c.39.393.386 1.026-.006 1.415-.187.186-.44.29-.704.29H1.4c-.55 0-1-.448-1-1 0-.264.105-.517.29-.704L9.316.716C9.705.322 10.337.32 10.73.71c0 .002.003.004.004.005z" 
                fill="#2E896A" 
                fillRule="evenodd" />
        </svg>
      )
      :
      (
        <svg className={this.props.className} width="23" height="13" viewBox="0 0 20 11" xmlns="http://www.w3.org/2000/svg">
          <title>
            Profit Indicator
          </title>
          <path d="M9.315 10.395L.69 1.705C.303 1.31.306.678.698.29.884.104 1.137 0 1.4 0H18.65c.552 0 1 .448 1 1 0 .264-.104.517-.29.704l-8.624 8.69c-.39.393-1.022.395-1.414.006l-.005-.005z" 
                fill="#882D4D" 
                fillRule="evenodd" />
        </svg>
      );

    return indicator;
  }
}

export default Indicator;