import React, { useEffect, useState } from 'react';
import Categories from '../categories/Categories';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    const user = localStorage.getItem('userName');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <main className="home" style={{ marginTop: '50px' }} >
      {isLoggedIn && (
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Welcome!
        </h2>
      )}

      <Categories />
    
    </main>
  );
}
