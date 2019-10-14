import React from "react"
import randomcolor from "randomcolor"
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: "",
      author: "",
      color: "",
      isLoading: true,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(quote => {
        this.setState({
          quote: quote.content,
          author: quote.author,
          isLoading: false,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.quote !== this.state.quote) {
      const newColor = randomcolor()
      this.setState({
        color: newColor,
      })
      document.body.style.backgroundColor = newColor;
      document.getElementById("button").style.backgroundColor = newColor;
    }
  }

  handleClick() {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(quote => {
        this.setState({
          quote: quote.content,
          author: quote.author,
        })
      })
  }

  render() {
    if (this.state.isLoading) {
      return(
        <div className="load-container">
          <img id="loading" src={require('./loading.gif')} alt="loading" />
        </div>
      )
    } else {
      return (
        <div style={{color: this.state.color}} className="container">
          <p>"{this.state.quote}"</p>
          <p>- {this.state.author}</p>
          <div id="button" onClick={this.handleClick}>New</div>
        </div>
      )
    }
  }
}

export default App