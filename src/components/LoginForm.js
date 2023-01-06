import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const {login} = useAuth();

  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch(err) {
      console.log(err);
      setLoading(false);
      setError('Failed to login!');
    }
  };

  return (
    <Form style={{height: "330px"}} onSubmit={handelSubmit}>
      
      <TextInput 
        type="email" 
        placeholder="Enter email" 
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />

      <TextInput 
        type="password" 
        placeholder="Enter password" 
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
      />

      <Button disabled={loading} type='submit' style={{height: "44px",
        marginTop: "2rem"}}>
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
              Do not have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
