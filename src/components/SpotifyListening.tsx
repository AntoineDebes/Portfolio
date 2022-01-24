import React, { useState, useEffect } from "react"
import axios from "axios"
import "./SpotifyListening.scss"
import { SpotifyListeningModel } from "../models/SpotifyListeningModel"
import MusicIcon from "../images/music-icon.gif"

const initialState = {
  isPlayingOpen: false,
  isPlaying: false, // Don't forget to change it to false
  name: undefined,
  images: undefined,
  artists: [
    {
      name: undefined,
    },
  ],
  spotify: undefined,
}

const SpotifyListening = () => {
  const [
    { isPlayingOpen, isPlaying, name, artists, images, spotify },
    setIsUserPlaying,
  ] = useState(initialState)

  useEffect(() => {
    const fetchUserPlaying = async () => {
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
            external_urls: { spotify },
          },
        } = results.data
        console.log("results: ", results)
        console.log("image: ", images)

        console.log("data: ", isPlaying, name, artists, images[2].url)

        setIsUserPlaying(prevState => ({
          ...prevState,
          isPlaying,
          name,
          images: images[2].url,
          artists,
          spotify,
        }))
      } catch (e) {
        console.error(e)
        setIsUserPlaying(initialState)
      }
    }
    fetchUserPlaying()
  }, [])

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
              <img src={images} alt="Spotify Artist Album Cover" />
              <div>{name}</div>
              <div>{artists[0]?.name}</div>
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
