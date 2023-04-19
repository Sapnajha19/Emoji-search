import React from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';

export default function Home() {
    
  return (
    <div style={{background:"#191642",position:"absolute",width:"100vw",height:"100vh",margin:"0",padding:"0"}}>
      <Navbar/>
      <div style={{display:"flex", flexDirection:"column", gap:"20px", position:"relative", top:"100px", justifyContent:"center", alignItems:"center"}}>
      <SearchBar/>
      </div>
    </div>
    
  )
}
