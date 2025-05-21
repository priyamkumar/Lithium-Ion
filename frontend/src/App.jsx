import { Toaster } from 'react-hot-toast';
import './App.css'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
