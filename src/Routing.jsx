import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Update from './Update';

const Routing = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  )
}

export default Routing
