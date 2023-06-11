import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import ContactUs from './components/pages/ContactUs'
import About from './components/pages/About'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ChatwithUs from './components/pages/ChatwithUs';
import "./index.css"
import { useEffect, useState } from 'react';
import SentimentAnalysis from './components/pages/SentimentAnalysis';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])

  return (

    <Routes>
      <Route exact path="/" element={<Home title="Home" />} />
      {!isAuthenticated && <Route exact path="/signin" element={<SignIn title="Log in" />} />}
      {!isAuthenticated && <Route exact path="/signup" element={<SignUp title="Sign Up" />} />}
      <Route exact path="/contact" element={<ContactUs title="Contact Us" />} />
      <Route exact path="/about" element={<About title="About" />} />
      {isAuthenticated ? <Route exact path="/chat" element={<ChatwithUs title="Chat" />} /> : <Route exact path="/chat" element={<SignIn title="Log in" />} />}
      {isAuthenticated ? <Route exact path="/sentiment-analysis" element={<SentimentAnalysis title="Sentiment Analysis" />} /> : <Route exact path="/sentiment-analysis" element={<SignIn title="Log in" />} />}
    </Routes>
  )
}

export default App
