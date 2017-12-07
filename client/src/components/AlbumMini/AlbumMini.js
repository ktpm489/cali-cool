import React, { Component } from "react";
import PropTypes from 'prop-types';
import AlbumMiniPhotos from "../AlbumMiniPhotos"
// import API from '../../utils/API';


const albumMini = {
  backgroundColor:"#c6c6c6",
  borderRadius:"10px"

}

const header = {
  color: "white",
  margin: "5px",
  fontSize: "25px"
}


class AlbumMini extends Component {

    state = {
      userAlbums: this.props.albums
    } 


  render(){

    return (
      <div className= "container">
        <div className="wrapper">
        {this.props.albums.map((album,i) => {
            return (
              <a href={'/album/' + album._id} key={album._id} >
                <div style={albumMini} >
                  <div>
                    <p style={header}>{album.title}</p>
                  </div>
                  <AlbumMiniPhotos photos={album.photos} />
                </div>
              </a>
              )
        })}
          
        </div>
      </div>
      );
  }
}

AlbumMini.propTypes = {
  thumbnail: PropTypes.bool
};

export default AlbumMini;