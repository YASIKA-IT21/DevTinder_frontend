import { useState } from 'react'
import '../src/App.css'
import Body from './Body.jsx'
import Login from './login.jsx'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx' // Adjust the path as necessary
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
function App() {
  

  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>} >
        <Route path='/login' element={<Login />} />
      </Route>
      

    </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
