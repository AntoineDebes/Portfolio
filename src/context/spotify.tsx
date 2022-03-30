import axios from "axios"
import React, { useState, useContext, createContext, useEffect } from "react"
import useInterval from "../hooks/useInterval"
import { SpotifyListeningModel } from "../models/SpotifyListeningModel"

const initialValue = {
  setUserSpotifyListeningInfo: () => {},
  userSpotifyListeningInfo: {
    isPlayingOpen: false,
    isPlaying: false,
    name: undefined,
    images: undefined,
    artists: [
      {
        name: undefined,
      },
    ],
  },
}

interface isSpotifyInfoProps {
  setUserSpotifyListeningInfo: Function
  userSpotifyListeningInfo: {
    isPlayingOpen: boolean
    isPlaying: boolean
    name: undefined | any
    images: undefined | any
    artists: {
      name: undefined
    }[]
  }
}

const IsSpotifyInfoContext = createContext<isSpotifyInfoProps>(initialValue)

const useIsSpotifyInfo = () => {
  return useContext(IsSpotifyInfoContext)
}

const IsSpotifyInfoContextProvider = ({ children }: any) => {
  const [userSpotifyListeningInfo, setUserSpotifyListeningInfo] = useState<any>(
    initialValue.userSpotifyListeningInfo
  )
  const fetchUserPlayingInterval = useInterval(fetchUserPlaying, 10000)

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
      setUserSpotifyListeningInfo((prevState: any) => ({
        ...prevState,
        isPlaying,
        name,
        images: images[2].url,
        artists,
      }))
    } catch (e) {
      console.error(e)
      setUserSpotifyListeningInfo(initialValue.userSpotifyListeningInfo)
    }
  }

  return (
    <IsSpotifyInfoContext.Provider
      value={{ userSpotifyListeningInfo, setUserSpotifyListeningInfo }}
    >
      {children}
    </IsSpotifyInfoContext.Provider>
  )
}
export default IsSpotifyInfoContextProvider
export { useIsSpotifyInfo }
