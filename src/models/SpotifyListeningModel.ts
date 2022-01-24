export interface SpotifyListeningModel {
  isPlaying: boolean
  data: {
    name: string
    images: string
    artists: any[]
    external_urls: { spotify: string }
  }
}
