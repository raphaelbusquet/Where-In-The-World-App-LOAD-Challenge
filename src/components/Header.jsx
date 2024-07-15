import React, { useState } from 'react'
import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('light-theme');
  }

  const navigate = useNavigate();

  const handleReload = (e) => {
    e.preventDefault();
    navigate('/');
    if (!darkMode) {
      window.location.reload();
    }
  }

  return (
    <>
       <header className={`${darkMode ? 'header' : 'header light-theme'}`}>
            <div className='title__header'>
              <Link  to='/' style={{ textDecoration: 'none', color: darkMode ? '#000' : '#fff' }} onClick={handleReload} >
              <h1>Where in the world?</h1>
            </Link>
            </div>
            <div className='menu__toggle' onClick={changeTheme}>
                {!darkMode ? <IoMdSunny className='icon' /> : <IoMoonSharp className='icon'/> }
                <p>{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
       </header>
    </>
  )
}

export default Header