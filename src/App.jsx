//imports the things needed for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//imports the pages used in project
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BookingConfirm from './pages/BookingConfirm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

//imports components used by all pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//imports the contexts and protecteed route
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';




function App() {
    return (
        //Authentication for my whole app
        <AuthProvider>
        {/*Cart state for the app*/}
        <CartProvider>
            {/*handles the navigation*/}
        <Router>
            <div className="flex flex-col min-h-screen">
                {/*Navigation bar for all pages*/}
                <Navbar />

                {/*main content area */}
                <main className="flex-grow">
                    {/*routes for different pages*/}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/event/:eventId" element={<EventDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/confirmation" element={<BookingConfirm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/*route for the profile page, only able to be accessed if logged in*/}
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
                </div>
        </Router>
        </CartProvider>
        </AuthProvider>
    );
}

export default App;
