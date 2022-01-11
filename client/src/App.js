import { Container } from '@material-ui/core' 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/navBar/NavBar';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import PostDetails from './components/postDetails/PostDetails';
import CustomAlert from './components/Alert/CustomAlert';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <>
      <BrowserRouter>
        <Container maxWidth='xl'>
          <NavBar />
          <Routes>
            <Route path='/' exact element={<Navigate replace={true} to='/posts'/>} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/posts/search' exact element={<Home />} />
            <Route path='/posts/:id' exact element={<PostDetails />} />
            <Route path='/auth' exact element={user ? <Navigate replace={true} to='/posts'/> : <Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <CustomAlert />
    </>
  );
}

export default App;
