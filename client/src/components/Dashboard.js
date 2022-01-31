import React, { useEffect } from 'react';
import { useJwt } from "react-jwt";

export default function Dashboard() {
    const token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt(token);

    useEffect(() => {
        if (!decodedToken || isExpired === false) {
            localStorage.removeItem('token');
        }

    }, []);

  return (
    <div>

    </div>
  );
}
