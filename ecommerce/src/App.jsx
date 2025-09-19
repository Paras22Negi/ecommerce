import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from './Components/Product'
import React from 'react'
import ProductDetail from './Components/ProductDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/productdetail/:id' element={<ProductDetail />} />
        {console.log(count)}
      </Routes>
    </>
  )
}

export default App
