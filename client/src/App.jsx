import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'
// import ContactUs from './components/pages/ContactUs'
// import About from './components/pages/About'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import "./index.css"
function App() {

  return (

    <Routes>
      <Route exact path="/" element={<Home title="Home" />} />
      <Route exact path="/signin" element={<SignIn title="Log in" />} />
      <Route exact path="/signup" element={<SignUp title="Sign Up" />} />
      {/* //   <Route exact path="/contact" element={<ContactUs title="Contact Us" />} /> */}
      {/* //   <Route exact path="/about" element={<About title="About" />} /> */}
    </Routes>
  )
}

export default App
