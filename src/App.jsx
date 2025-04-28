import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Cart from './pages/Cart';
import BookingConfirm from './pages/BookingConfirm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ children }) {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/event/:eventId" element={<EventDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/success" element={<BookingConfirm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
                </div>
        </Router>
    );
}

export default App;
