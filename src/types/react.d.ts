// import { ModelViewerElement } from '@google/model-viewer'

// export declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'model-viewer': Partial<ModelViewerElement>
//     }
//   }
// }

interface ModelViewerJSX {
  alt?: string
  ar?: boolean
  ['ar-modes']?: string
  ['ar-scale']?: string
  autoplay?: boolean
  ['auto-rotate']?: boolean
  ['camera-controls']?: boolean
  ['camera-orbit']?: string
  ['environment-image']?: string
  exposure?: string
  ['interaction-prompt-threshold']?: string
  ['ios-src']?: string
  poster?: string
  scale?: string
  ['seamless-poster']?: boolean
  ['shadow-intensity']?: string
  src: string
  style?: Partial<CSSStyleDeclaration> & React.CSSProperties
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
