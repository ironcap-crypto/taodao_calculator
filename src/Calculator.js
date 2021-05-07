import cheerio from "cheerio";
import React from "react";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      walletAddress: "",
    };

    this.balanceCheckAdderss =
      "https://bscscan.com/token/0xe12d3c8675a88fedcf61946089079323342982bb?a=";

    this.getBalanceFromAddress = this.getBalanceFromAddress.bind(this);
    this.onInputChage = this.onInputChage.bind(this);
  }

  getBalanceFromAddress() {
    const { walletAddress } = this.state;
    console.log(this.state);
    if (walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      console.log(walletAddress);
      const url = `${this.balanceCheckAdderss}${walletAddress.toLowerCase()}`;
      debugger;
      fetch(url, {
        mode: "no-cors",
      })
        .then((res) => {
          debugger;
          res.text();
        })
        .then((html) => {
          const $ = cheerio.load(html);
          debugger;
          const sTaoBalanceEle = $(
            "#ContentPlaceHolder1_divFilteredHolderBalance"
          );
          const balance = sTaoBalanceEle.text().match(/(\d+\.\d+)/);
          if (balance && balance[1] && parseFloat(balance[1]) > 0) {
            this.setState({ balance: balance[1] });
          } else {
            this.setState({ error: "No sTAO balance in wallet" });
          }
        });
    }
  }

  onInputChage(e) {
    const {
      target: { value },
    } = e;
    console.log(e);
    this.setState({ walletAddress: value }, () => this.getBalanceFromAddress());
  }

  render() {
    return (
      <div className="wrapper">
        <div className="dapp-center-modal">
          <div className="dapp-modal-wrapper">
            <h2
              style={{
                margin: "0 auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              TAO Calculator
            </h2>
            <div className="swap-input-column">
              <div className="stake-toggle-row">
                <div style={{ display: "flex" }}>
                  <label
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                      width: "100%",
                    }}
                    htmlFor="address"
                  >
                    Wallet Address
                  </label>
                </div>
                <div className="swap-input-row">
                  <div className="stake-input-container">
                    <input
                      id="address"
                      className="stake-input"
                      type="text"
                      placeholder="0xAddress"
                      value={this.state.walletAddress}
                      onChange={(e) => this.onInputChage(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="stake-price-data-column">
                <div className="stake-price-data-row">
                  <p className="price-label">Staked Amount</p>
                  <p className="price-data">0.0 TAO</p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Current Price</p>
                  <p className="price-data">$214.5134</p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Total Supply</p>
                  <p className="price-data"> 1.1405 %</p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Circulation Supply</p>
                  <p className="price-data"> 19 </p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">APY</p>
                  <p className="price-data">0d, 1h, 3m, 3 seconds</p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Days of Locked In Profits</p>
                  <p className="price-data"> 0.53 % </p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Amount in X Days</p>
                  <p className="price-data"> 11.19 % </p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Amount in a Month</p>
                  <p className="price-data"> 230337% </p>
                </div>
                <div className="stake-price-data-row">
                  <p className="price-label">Amopunt in an Year</p>
                  <p className="price-data">1.1091 TAO</p>
                </div>
              </div>
            </div>
            <p
              style={{
                margin: "0 auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              Calculations made are assumptions based on current data. It can
              vary from time to time. It is calculated by considering the number
              of sTAO in your wallet as if you start staking today. We don't
              consider historical data.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
