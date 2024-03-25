// import { ModelViewerElement } from '@google/model-viewer'

// export declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'model-viewer': Partial<ModelViewerElement>
//     }
//   }
// }

interface ModelViewerJSX {
  src: string
  poster?: string
  ['ios-src']?: string
  ['seamless-poster']?: boolean
  autoplay?: boolean
  ['environment-image']?: string
  exposure?: string
  ['interaction-prompt-threshold']?: string
  ['shadow-intensity']?: string
  ar?: boolean
  ['ar-modes']?: string
  ['auto-rotate']?: boolean
  ['camera-controls']?: boolean
  ['camera-orbit']?: string
  alt?: string
  style?: Partial<CSSStyleDeclaration> & React.CSSProperties
  scale?: string
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
