import React, { Component } from 'react';

class UpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener('wheel', this.handleScroll);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ show: false });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('scroll', this.handleScroll);
  }

  onClickButtonUp = () => {
    const offsetTopForScroll = window.pageYOffset / 25;
    const timer = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(timer);
        this.setState({ show: false });
        return;
      }
      window.scrollBy(0, -offsetTopForScroll);
    }, 20);
  };

  handleScroll = () => {
    if (window.pageYOffset >= 425 && !this.state.show) {
      this.setState({ show: true });
    }
    if (window.pageYOffset < 425 && this.state.show) {
      this.setState({ show: false });
    }
  };

  render() {
    return (
      this.state.show && (
        <button id="return-to-top" onClick={this.onClickButtonUp}>
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>
      )
    );
  }
}

export default UpButton;
