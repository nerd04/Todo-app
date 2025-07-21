import { useState, useEffect } from 'react';

export default function Time() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <div className="w-full text-center mt-4">
      <p className="text-sm text-gray-600">
        <b className="text-blue-600">{currentDate.toLocaleString()}</b>
      </p>
    </div>
  );
}
