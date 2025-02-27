import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar';
import { Box } from '@chakra-ui/react';
import Login from './Pages/Login/login';
import Payment from './Components/Forms/payment';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';
import Profile from './Pages/Profile/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Box p={4}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />

            {/* Protected Routes */}
            {/* <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/payment" element={<Payment />} />
            </Route> */}
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
