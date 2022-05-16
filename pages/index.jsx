import React  from 'react'
import {logoutUser} from './util/auth';

export default function Home() {
  return (
    <div>
     {/*
      navbar
        search
        logo
        accounts
     */}
    <div className="navbar">
      <input type="text" className = "search"/>
      <div className="logo"></div>
      <div className="accounts"></div>

    
    </div>
     {/* picture and text */}
     <div className="landing">

     </div>

{/* new realeses */}
<div className="new_shoes">

</div>

{/* popular shoes */}
<div className="popular_shoes">

</div>

<div className="footer">

</div>
<button onClick = {(e) => {
  logoutUser('joshua1@gmail.com')
}}>logout</button>
    </div>
  )
}
