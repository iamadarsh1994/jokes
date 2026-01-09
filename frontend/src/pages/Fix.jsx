import LogoutButton from '../components/LogoutButton'
import React from 'react'

function Fix() {
  return (
   <nav className="fixed top-0 w-full z-10 bg-black shadow-lg">
  <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

    <h1 className="text-white text-lg md:text-xl font-semibold">
      Welcome on Joke Box.
    </h1>  
    <div>
      <a href="https://www.fiverr.com/s/5rZg1jb"><button>Hire Me</button></a>
    </div>
    <div>
      <LogoutButton />
    </div>

  </div>
</nav>
 )
}

export default Fix
