
import './globals.css'
import LandingOne from "./_compnents/landingPage/landingOne"
import LandingTwo from "./_compnents/landingPage/landingTwo"
import LandingThree from "./_compnents/landingPage/landingThree"

export default function Home(){
  return (
    <div>
      <LandingOne />
      <LandingTwo />
      <LandingThree />
    </div>
  )
}