import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
function Main() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/index/*" element={<AdminIndex />} />
        </Routes>
    )

}

export default Main