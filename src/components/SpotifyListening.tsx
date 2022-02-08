import React, { useState, useEffect } from "react"
import axios from "axios"
import "./SpotifyListening.scss"
import { SpotifyListeningModel } from "../models/SpotifyListeningModel"
import MusicIcon from "../images/music-icon.gif"
import useInterval from "../hooks/useInterval"

const initialState = {
  isPlayingOpen: false,
  isPlaying: false,
  name: undefined,
  images: undefined,
  artists: [
    {
      name: undefined,
    },
  ],
}

const SpotifyListening = () => {
  const fetchUserPlayingInterval = useInterval(fetchUserPlaying, 10000)
  const [
    { isPlayingOpen, isPlaying, name, artists, images },
    setIsUserPlaying,
  ] = useState(initialState)

  useEffect(() => {
    fetchUserPlaying()
    fetchUserPlayingInterval
  }, [])

  async function fetchUserPlaying() {
    try {
      const results = await axios.get<SpotifyListeningModel, any>(
        "https://wpshortcuts.mystagingwebsite.com/wp-json/spotify/v1/playing/5"
      )
      const {
        isPlaying,
        data: {
          name,
          artists,
          album: { images },
        },
      } = results.data
      setIsUserPlaying(prevState => ({
        ...prevState,
        isPlaying,
        name,
        images: images[2].url,
        artists,
      }))
    } catch (e) {
      console.error(e)
      setIsUserPlaying(initialState)
    }
  }
  return isPlaying ? (
    <div className="container__picture__listening">
      {!isPlayingOpen ? (
        <>
          <div className="container__picture__listening__spotify-container">
            <div className="container__picture__listening__spotify-container--inner">
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
        </>
      ) : (
        <div></div>
      )}
    </div>
  ) : null
}

export default SpotifyListening
