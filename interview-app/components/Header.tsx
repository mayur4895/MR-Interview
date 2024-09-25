'use client'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className=' w-full h-14 border-b '>
      <div className=' px-16  h-full flex items-center justify-between'>
        <span className=' text-base   tracking-wider'>MR-INTERVIEW.</span>
      <UserButton showName   appearance={{
    elements: {
      userButtonAvatarBox: {
        width: '2rem',
        height: '2rem',
      },
      userButtonLabel: {
        fontSize: '1rem',
      },
    },
  }}  />
      </div>
    </div>
  )
}

export default Header
