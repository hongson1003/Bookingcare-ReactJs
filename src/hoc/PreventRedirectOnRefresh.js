import React from "react";
class PreventRedirectOnRefresh extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  componentDidMount() {
    window.addEventListener('refresh', this.handleRefresh);
  }

  componentWillUnmount() {
    window.removeEventListener('refresh', this.handleRefresh);
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 500);
  };

  render() {
    const { isRefreshing } = this.state;

    return (
      <div>
        {!isRefreshing && this.props.children}
      </div>
    );
  }
}

export default PreventRedirectOnRefresh;