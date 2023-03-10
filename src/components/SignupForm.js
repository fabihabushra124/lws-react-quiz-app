import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState('');

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const {signup} = useAuth();

  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const handelSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if(password !== confirmPassword) {
      return setError(`Passwords don't match!`);
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, username);
      navigate('/');
    } catch(err) {
      console.log(err);
      setLoading(false);
      setError('Failed to create account!');
    }
  };

  return (
    <Form style={{
      height: "500px"
    }}
    onSubmit={handelSubmit}
    >
      <TextInput 
        type="text" 
        placeholder="Enter name" 
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required 
      />

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

      <TextInput 
        type="password" 
        placeholder="Confirm password" 
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required 
      />

      <Checkbox 
        style={{marginTop: "1rem"}} 
        text="I agree with the Terms & Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
        required 
      />

      <Button disabled={loading} type="submit" style={{height: "44px",
        marginTop: "2rem"}}>
        <span>Submit now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
