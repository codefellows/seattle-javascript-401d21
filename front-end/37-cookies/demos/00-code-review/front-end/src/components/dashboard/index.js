import React from 'react'
import {connect} from 'react-redux'
import AlbumForm from '../album/album-form'
import {
  albumFetchRequest,
  albumCreateRequest,
  albumDeleteRequest} from '../../actions/album-actions'
import {trackFetchRequest} from '../../actions/track-actions'

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchAlbums()
    this.props.fetchTracks()
  }

  render() {
    return (
      <div className="dashboard-container">
        <h1>Hello world - music things</h1>

        <AlbumForm
          buttonText='create'
          onComplete={this.props.createAlbum}/>

        {this.props.albums ?
          this.props.albums.map(album =>
            <div key={album._id}>
              <span onClick={() => this.props.deleteAlbum(album)}>x</span>
              <p>{album.name}</p>
            </div>)
          :
          undefined
        }
      </div>
    )
  }
}

let mapStateToProps = state => ({
  albums: state.albums,
})

let mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(albumFetchRequest()),
  fetchTracks: () => dispatch(trackFetchRequest()),
  createAlbum: album => dispatch(albumCreateRequest(album)),
  deleteAlbum: album => dispatch(albumDeleteRequest(album)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
