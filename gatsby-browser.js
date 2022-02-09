import React from "react"
import IsSpotifyInfoContextProvider from "./src/context/spotify"

export const wrapRootElement = ({ element }) => (
  <IsSpotifyInfoContextProvider>{element}</IsSpotifyInfoContextProvider>
)
