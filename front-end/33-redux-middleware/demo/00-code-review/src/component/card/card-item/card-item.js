import React from 'react'
import {connect} from 'react-redux'
import CardForm from '../card-form/card-form'
import {cardUpdate, cardDelete} from '../../../action/card-actions'

class CardItem extends React.Component {
  render() {
    return (
      <section id={this.props.card._id}>
        <h3>{this.props.title}</h3>
        <span onClick={() => this.props.cardDelete(this.props.card)}>x</span>
        <CardForm
          buttonText="update"
          card={this.props.card}
          onComplete={this.props.cardUpdate}/>
      </section>
    )
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = (dispatch, getState) => ({
  cardUpdate: card => dispatch(cardUpdate(card)),
  cardDelete: card => dispatch(cardDelete(card)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardItem)
