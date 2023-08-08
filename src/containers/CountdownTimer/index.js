import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setResetTimer } from '../../reducers/storeMap';
import { useGetStoreListQuerySubscription } from '../../api/store';

const CountdownTimer = ({ duration = 60 }) => {
  const [timer, setTimer] = useState(duration);
  const { resetTimer } = useSelector((state) => state.storeMap);
  const dispatch = useDispatch();
  const { refetch } = useGetStoreListQuerySubscription();

  useEffect(() => {
    if (resetTimer) {
      setTimer(duration);
      dispatch(setResetTimer(false));
    }
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0) {
        refetch();
        setTimer(duration);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // format the timer as minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-primary">{formatTime(timer)}</div>
  );
};

export default CountdownTimer;
