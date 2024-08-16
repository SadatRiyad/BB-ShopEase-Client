import { Helmet } from 'react-helmet-async'
import './App.css'
import Hero from './components/Hero/Hero'

function App() {

  return (
    <>
      <div className='bg-base-300'>
        <Helmet>
          <title>Home | BB-ShopEase</title>
        </Helmet>
        <Hero></Hero>

      </div>
    </>
  )
}

export default App