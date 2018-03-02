import './_slider.scss'
import React from 'react'

class SliderCheckbox extends React.Component {
  render() {
    return (
      <div className={this.props.config.className + ' slider-checkbox'}>
        <input
          type='checkbox'
          name={this.props.config.name}
          id={this.props.config.id}
          defaultChecked={false}
          onChange={this.props.onChange}/>

        <label htmlFor={this.props.config.id}><div></div></label>
      </div>
    )
  }
}

export default SliderCheckbox
