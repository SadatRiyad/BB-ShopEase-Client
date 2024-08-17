import { Helmet } from 'react-helmet-async'
import './App.css'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'

function App() {

  return (
    <>
      <div className='bg-base-300'>
        <Helmet>
          <title>Home | BB-ShopEase</title>
        </Helmet>
        <Hero></Hero>
        <Products></Products>
        <AboutUs></AboutUs>
        <ContactUs></ContactUs>
      </div>
    </>
  )
}

export default App