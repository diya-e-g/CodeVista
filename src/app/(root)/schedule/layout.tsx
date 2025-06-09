import StreamClientProvider from '@/components/ui/providers/StreamClientProvider'
import { StreamCallProvider } from '@stream-io/video-react-sdk'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <StreamClientProvider>
        {children}
    </StreamClientProvider>
  )
}

export default Layout