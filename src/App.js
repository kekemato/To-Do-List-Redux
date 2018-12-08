import React from 'react'
import ToDo from './ToDo'
import Auth from './Auth'

class App extends React.Component {
  render() {
    return (
      <Auth>
        <ToDo />
      </Auth>
    )
  }
}

export default App
