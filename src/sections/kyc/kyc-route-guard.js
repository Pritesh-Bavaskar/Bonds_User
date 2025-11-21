import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function KYCRouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserData = () => {
      const userEmail = localStorage.getItem('userEmail');
      const userFullName = localStorage.getItem('userFullName');
      const userPhone = localStorage.getItem('userPhone');

      // If any of the required user details are missing and we're on a KYC route
      if (
        (!userEmail || !userFullName || !userPhone) &&
        (location.pathname.startsWith('/kyc/basic-info') ||
          location.pathname.startsWith('/kyc/pending') ||
          location.pathname.startsWith('/kyc/success'))
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
