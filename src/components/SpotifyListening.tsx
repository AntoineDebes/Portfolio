import React from "react"
import "./SpotifyListening.scss"
import MusicIcon from "../images/music-icon.gif"
import { useIsSpotifyInfo } from "../context/spotify"

const SpotifyListening = () => {
  const {
    userSpotifyListeningInfo: {
      artists,
      images,
      isPlaying,
      isPlayingOpen,
      name,
    },
    setUserSpotifyListeningInfo,
  } = useIsSpotifyInfo()

  return isPlaying ? (
    <div className="container__picture__listening">
      <div className="container__picture__listening__spotify-container">
        <div
          className="container__picture__listening__spotify-container--inner"
          onClick={() =>
            setUserSpotifyListeningInfo((prevState: any) => ({
              ...prevState,
              isPlayingOpen: true,
            }))
          }
        >
          <img
            src={MusicIcon}
            alt="Spotify gif in green"
            className="container__picture__listening__spotify-container__gif"
          />
        </div>
        <div className="container__picture__listening__spotify-container__content">
          <div className="container__picture__listening__spotify-container__content__img-container">
            <img
              className="container__picture__listening__spotify-container__content__img-container__img"
              src={images}
              alt="Spotify Artist Album Cover"
            />
          </div>
          <div className="container__picture__listening__spotify-container__content__container">
            <div
              title={name}
              className="container__picture__listening__spotify-container__content__container__song-name"
            >
              <b>Song: </b>
              {name}
            </div>
            <div
              title={artists[0]?.name}
              className="container__picture__listening__spotify-container__content__container__song-name"
            >
              <b>Artist: </b>
              <span>{artists[0]?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default SpotifyListening
