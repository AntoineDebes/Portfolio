import React, { useState, useContext, createContext } from "react"

const initialValue = {
  isSpotifyInfo: false,
  setIsSpotifyInfo: () => {},
}

interface isSpotifyInfoProps {
  isSpotifyInfo: boolean
  setIsSpotifyInfo: Function
}

const IsSpotifyInfoContext = createContext<isSpotifyInfoProps>(initialValue)

const useIsSpotifyInfo = () => {
  return useContext(IsSpotifyInfoContext)
}

const IsSpotifyInfoContextProvider = ({ children }: any) => {
  const [isSpotifyInfo, setIsSpotifyInfo] = useState<boolean>(false)
  console.log("isSpotifyInfo: ", isSpotifyInfo)

  return (
    <IsSpotifyInfoContext.Provider value={{ isSpotifyInfo, setIsSpotifyInfo }}>
      {children}
    </IsSpotifyInfoContext.Provider>
  )
}
export default IsSpotifyInfoContextProvider
export { useIsSpotifyInfo }
