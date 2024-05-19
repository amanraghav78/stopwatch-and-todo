import React from 'react';
import {useNavigate} from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  
  function handleClickDashboard(){
    navigate('/dashboard')
  };

  function handleClickLanding(){
    navigate('/')
  };
  
  return (
    <div className='flex justify-between bg-red-200 bg-opacity-90 font-bold text-blue-600 italic'>
      <button onClick={handleClickDashboard}>Go to dashboard</button>
      <button onClick={handleClickLanding}>Go to homepage</button>
    </div>
  );
}

export default Header;
