import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyUser from '../api/verifyUser';
import getUserToken from '../helpers/getUserToken';

const useTokenRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = getUserToken();
      if (token === null) {
        navigate('/');
        return;
      }

      try {
        await verifyUser(token);

        navigate('/home');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          navigate('/');
        }
      }
    })();
  }, []);
};

export default useTokenRedirect;
