import './styles/reset.scss'
import './styles/main.scss'

import React from 'react'
import ReactDom from 'react-dom'
import FormInput from './components/form-elements/input/input'
import Slider from './components/form-elements/slider-checkbox/slider'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      slider: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sliderToggle = this.sliderToggle.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  sliderToggle(e) {
    console.log('slider is:', e.target.checked)
    this.setState({slider: e.target.checked})
  }

  render() {
    return (
      <div className="application">
        <h1>Hello world!</h1>
        <h3>Check out my custom form elements</h3>

        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              config={({
                className: 'form-inputs',
                name: 'title',
                value: this.state.title,
                type: 'text',
                placeholder: 'React Documentation'
              })}
              onChange={this.handleChange}/>

              <Slider
                config={({
                  id: 'slider-one',
                  className: 'slider-checkbox',
                  value: this.state.sliderOne,
                  name: 'slider-one'
                })}
                onChange={this.sliderToggle}/>

            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
