import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HotelList from './components/HotelList'

import MainAdmin from './components/MainAdmin'
import HotelLandingPage from './components/HotelLandingPage'
import GuestAdminLogin from './components/GuestAdminLogin'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path='/mainadminlogin' element={<MainAdmin/>}/>
      <Route path='/guestadminlogin' element={<GuestAdminLogin/>} />
      <Route path='/' element={<HotelList/>}/>
      <Route path='hotels/:id' element={<HotelLandingPage/>}/>
    </Routes>
   
   </BrowserRouter>
   

   </>
  )
}

export default App
