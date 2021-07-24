import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomInput from '../components/CustomInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';
// email
// password

const initialState = {
  email: '',
  password: '',
};

const signIn = async (signinInfo) => {
  return {
    data: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  };
  // return axios.post('https://iwallet-api.herokuapp.com/api/auth/signin', { ...signinInfo });
};

// const parsePlannedRoute = (url) => {
//   try {
//     const href = [];
//     const as = [];
//     var query = url.split('?')[1];
//     query.split('&').forEach(function (part) {
//       var item = part.split('=');
//       href.push(`/[${item[0]}]`);
//       as.push(`/${item[1]}`);
//     });
//     return { href: href.join(''), as: as.join('') };
//   } catch (err) {
//     console.log('err', err);
//     return null;
//   }
// };

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState(initialState);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;

    if (!email || !password) {
      return;
    }

    try {
      const response = await signIn(signinInfo);

      cookies.set(null, 'token', response.data.token, { path: '/' });
      const { plannedRoute } = cookies.get();

      const parsedPlannedRoute = parsePlannedRoute(plannedRoute);

      const plannedHrefRoute = plannedRoute ? plannedRoute : '/[country]';
      const plannedAsRoute = plannedRoute ? plannedRoute.split('?')[0] : '/us';

      router.replace(plannedHrefRoute, plannedAsRoute);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };

  return (
    <div className='signin'>
      <form onSubmit={handleSubmit}>
        <CustomInput name='email' placeholder='Enter your email' value={signinInfo.email} onChange={handleInputChange} onBlur={validateEmail}></CustomInput>
        <CustomInput
          name='password'
          placeholder='Enter your password'
          type='password'
          value={signinInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}></CustomInput>

        {error && <div className='error'>{error}</div>}

        <Link href='/signup'>
          <a>Create an account</a>
        </Link>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Signin;
