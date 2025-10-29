import { useState } from 'react'
import './App.css'
import Body from './Body.jsx'
import Login from './login.jsx'
import Profile from './Profile.jsx'
import Requests from './Requests.jsx'
import { Provider } from 'react-redux'
import Feed from './Feed.jsx'
import Appstore from '../utils/Appstore.js'
import Connections from './Connections.jsx'
import Chat from './Chat.jsx'

import { BrowserRouter ,Routes,Route} from 'react-router-dom'
function App() {
  

  return (
    <>
    <Provider store={Appstore}>
      <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/' element={<Body/>} >
        
        <Route path='/login' element={<Login/>} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/connections' element={<Connections/>} />
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/chat/:userId' element={<Chat/>}/>
      </Route>
      
<Route path='*' element={<Login/>} /> 
    </Routes>
    </BrowserRouter>

    </Provider>
    

      
    </>
  )
}

export default App
