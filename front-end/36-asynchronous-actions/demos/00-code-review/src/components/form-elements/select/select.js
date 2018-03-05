import React from 'react'

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selecting: false,
      current: this.props.config.items[0]
    }
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  componentWillMount() {
    console.log('__will mount__', this.props)
  }

  componentDidMount() {
    console.log('__did mount__', this.props)
  }

  componentWillUpdate() {
    console.log('__will update__', this.props)
  }

  componentWillReceiveProps(props) {
    console.log('__new props__', props)
  }

  componentWillUpdate() {
    console.log('__will update__', this.props)
  }


  toggleSelect(e) {
    // TODO: Dan is going to fix this issue... it's an off-by-one error.
    if(this.state.selecting) {
      this.setState({current: this.props.config.items.filter(item =>
        item._id === e.target.id)[0]})
        this.props.onComplete(this.state.current)
      }
    this.setState({selecting: !this.state.selecting})
  }

  render() {
    return (
      <div
        className={this.props.config.classes.concat(" select-container")}
        onClick={this.toggleSelect}>
        <ul>
          <li>---Select a thing---</li>
          {this.props.config.items && this.state.selecting ?
            this.props.config.items.map((item, idx) =>
              <li
                key={item._id}
                data-value={item.name.replace(' ', '_')}
                id={item._id}>{item.name}</li>)
            :
            undefined
          }
        </ul>
      </div>
    )
  }
}

export default Select
