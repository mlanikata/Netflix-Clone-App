import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import search_icon from '../assets/search_icon.svg';
import bell_icon from '../assets/bell_icon.svg';
import profile_img from '../assets/profile_img.png';
import caret_img from '../assets/caret_icon.svg';
import { logout } from '../firebase';

const Navbar = () => {
  
const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
        navRef.current.classList.add('nav-visible');
      } else {
        navRef.current.classList.remove('nav-dark');
        navRef.current.classList.remove('nav-visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav>
      <div ref={navRef} className="navbar">
        <div className="navbar__left">
          <img src={logo} alt="" />
          <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="navbar__right">
          <img src={search_icon} alt="" className="icons" />
          <p>Children</p>
          <img src={bell_icon} alt="" className="icons" />
          <div className="navbar__profile">
            <img src={profile_img} alt="" className="profile" />
            <img src={caret_img} alt="" />
            <div className="dropdown">
                <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

