import { Toaster } from 'react-hot-toast';
import './App.css'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from "react-router-dom";
import ScrollToTop from './ScrollToTop';

function App() {

  return (
    <>
    <ScrollToTop/>
    <Header/>
    <Outlet/>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
