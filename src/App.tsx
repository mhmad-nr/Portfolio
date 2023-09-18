import { Provider } from './contex'
import ScrollHandel from './ScrollHandel'

function App() {


  return (
    <Provider>
      <NavBar />
      <ScrollHandel />
    </Provider >
  )
}

export default App

const NavBar = () => {
  return (
    <div>App</div>
  )
}


