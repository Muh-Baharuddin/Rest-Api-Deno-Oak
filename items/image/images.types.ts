export interface ResponseImage {
  data: Data
  success: boolean
  status: number
}

export interface Data {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  width: number
  height: number
  size: number
  time: number
  expiration: number
  image: ImageFullSize
  thumb: ImageThumbSize
  medium: ImageMediumSize
  delete_url: string
}

export interface ImageFullSize {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface ImageThumbSize {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface ImageMediumSize {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}
