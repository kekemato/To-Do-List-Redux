import React from 'react'
import ToDo from './ToDo'
import Auth from './Auth'

const App = props => (
  <Auth>
    <ToDo />
  </Auth>
)

export default App
