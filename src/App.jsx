import { useState } from 'react'
import '../src/App.css'
import Body from './Body.jsx'
import Login from './login.jsx'
import Profile from './Profile.jsx'
import Footer from './Footer.jsx'
import { Provider } from 'react-redux'
import Feed from './Feed.jsx'
import Appstore from './utils/Appstore.js'
import NavBar from './NavBar.jsx' // Adjust the path as necessary
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
function App() {
  

  return (
    <>
    <Provider store={Appstore}>
      <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>} >
        <Route path='/' element={<Feed />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      

    </Routes>
    </BrowserRouter>

    </Provider>
    

      
    </>
  )
}

export default App
