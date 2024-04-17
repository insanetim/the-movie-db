declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    { title?: string } & React.SVGProps<SVGSVGElement>
  >

  const src: string
  export default src
}
