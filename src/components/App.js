import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
import PrivateOutlet from './PrivateOutlet';
import PublicOutlet from './PublicOutlet';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<PublicOutlet />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='/*' element={<PrivateOutlet />}>
            <Route path='quiz/:id' element={<Quiz />} /> {/* To pass video id in URL */}
            <Route path='result/:id' element={<Result />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;

/* 
E-mail: piyal@abcd.com
Password: 123456
*/