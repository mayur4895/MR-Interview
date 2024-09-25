import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' fixed top-0 left-0 item-center    justify-center w-full h-screen'>
     <div className=' flex items-center justify-center w-full h-full'>
     {children}
     </div>
    </div>
  )
}

export default AuthLayout
