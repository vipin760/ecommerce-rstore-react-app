import React from 'react'
import logo from '../../../images/r-store.png'
import { ReactNavbar } from "overlay-navbar"
const options = {
  burgerColor:"#eb4034",
  logo,
  logoWidth:"20vmax",
  navColor1:"rgba(0,0,0,0.4)",
  logoHoverSize:"10px",
  logoHoverColor:"#eb4034",
  link1Text:"Home",
  link2Text:"Product",
  link3Text:"Contact",
  link4Text:"About",
  link1Url:"/",
  link2Url:"/product",
  link3Url:"/contact",
  link4Url:"/about",
  link1Size:"1vmax",
  link1Color:"#fff",
  nav1justifyContent:"flex-end",
  nav2justifyContent:"flex-end",
  nav3justifyContent:"flex-start",
  nav4justifyContent:"flex-start",
  link1ColorHover:"#eb4034",
  link1Margin:"1vmax",
  profileIconColor:"rgba(35,35,35,0.8)",
  searchIconColor:"rgba(35,35,35,0.8)",
  cartIconColor:"rgba(35,35,35,0.8)",
  profileIconColorHover:"#eb4034",
  searchIconColorHover:"#eb4034",
  cartIconColorHover:"IconColorHover",
  cartIconMargin:"1vmax",
}

const Header = () => {
  return (
    <div>
      <ReactNavbar {...options}
      />
    </div>
  )
}

export default Header
