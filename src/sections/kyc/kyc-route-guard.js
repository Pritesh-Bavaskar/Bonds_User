import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function KYCRouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserData = () => {
      const sessionId = localStorage.getItem('sessionId');


      // If any of the required user details are missing and we're on a KYC route
      if (
        (!sessionId) &&
        (location.pathname.startsWith('/kyc/basic-info'))
      ) {
        navigate('/issuer');
        return false;
      }
      return true;
    };

    checkUserData();
  }, [navigate, location.pathname]);

  return children;
}
