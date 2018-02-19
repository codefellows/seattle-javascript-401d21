import './styles/main.scss'

// const React = require('react')
import React from 'react'
import ReactDom from 'react-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="main_header">
        <h1>This is my nav!!</h1>
      </header>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        <h1>Hello World</h1>
        <p onClick={this.handleClick}>Counter: {this.state.count}</p>
        {console.log('hello there')}
        <p>paleo sustainable +1 kitsch four loko Blue Bottle skateboard single-origin coffee meh literally keytar vinyl Austin next level selfies Pinterest tousled American Apparel seitan hashtag High Life Schlitz crucifix forage Shoreditch lo-fi fap bespoke yr biodiesel Thundercats Kickstarter keffiyeh organic asymmetrical viral try-hard small batch squid Vice wolf ennui XOXO locavore butcher chillwave stumptown mlkshk plaid mixtape distillery shabby chic PBR whatever typewriter Etsy letterpress 90's normcore put a bird on it Bushwick Cosby sweater Intelligentsia art party ugh slow-carb bitters cornhole Echo Park food truck church-key authentic McSweeney's before they sold out swag lomo gentrify artisan Truffaut you probably haven't heard of them Williamsburg craft beer Godard Wes Anderson Helvetica PBR&B wayfarers disrupt flannel pork belly messenger bag Portland vegan irony post-ironic fanny pack iPhone tofu trust fund farm-to-table drinking vinegar selvage gastropub gluten-free pop-up dreamcatcher YOLO salvia sriracha flexitarian leggings banjo hella direct trade  narwhal pour-over meggings Carles jean shorts deep v tote bag aesthetic roof party raw denim actually DIY freegan chambray sartorial occupy umami Tumblr semiotics brunch polaroid beard banh mi tattooed hoodie chia scenester fixie cray cred kogi master cleanse Odd Future heirloom cliche Marfa retro 8-bit 3 wolf moon Brooklyn kale chips readymade fingerstache photo booth ethical cardigan Tonx pug twee quinoa Banksy Neutra mustache synth fashion axe blog VHS Pitchfork street art pickled mumblecore bicycle rights</p>
        <Navbar />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
