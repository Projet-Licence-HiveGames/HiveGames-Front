import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './PaymentSuccess.css';
import {useAuth} from "../../context/AuthProvider.tsx";
import {privateApi} from "../../api/privateApi.ts";

export const PaymentSuccess:React.FC = ({}) => {
  const {isAuthenticated, user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const [paymentData, setPaymentData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // },[]);

  const fetchData = async () => {
    await privateApi(`/stripe/order/${sessionId}`, 'GET')
        .then((response) => {
            setPaymentData(response.data);
        })
        .catch((error) => {
            setError({...error, error});
        });
  };
  console.log(paymentData);

  useEffect(() => {
    if (user) {
        fetchData();
    }
  }, [user]);

  // useEffect(() => {
  //   if (paymentData.status !== 'succeeded') {
  //       navigate('/home');
  //   }
  // }, []);

  return (
    <div>
      {paymentData}
    </div>
  );
};