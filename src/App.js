import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Weather from './pages/Weather';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <div className='navbar'>
                    <div className='navbar-links'>
                        <Link to='/weather'>
                            <span>Onboarding</span>
                        </Link>
                        <Link to='/dashboard'>
                            <span>Dashboard</span>
                        </Link>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<Weather />} />
                    <Route path='/weather' element={<Weather />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
