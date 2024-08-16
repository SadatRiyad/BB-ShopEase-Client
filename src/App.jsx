import { Helmet } from 'react-helmet-async'
import './App.css'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'

function App() {

  return (
    <>
      <div className='bg-base-300'>
        <Helmet>
          <title>Home | BB-ShopEase</title>
        </Helmet>
        <Hero></Hero>
        <Products></Products>
      </div>
    </>
  )
}

export default App