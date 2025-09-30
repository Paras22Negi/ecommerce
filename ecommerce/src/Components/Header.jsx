import React from 'react'
import { useNavigate } from 'react-router-dom'


function Header() {
    const navigate = useNavigate();

  return (
    <div className="h-16 bg-blue-500 flex items-center justify-between px-8">
      <ul className="flex gap-6 list-none m-0 p-0 cursor-pointer hover:scale-104 transition">
        <div >
          <li onClick={() => navigate("/")}>Home</li>
          <li>Login</li>
          <li>Sigup</li>
        </div>
      </ul>
    </div>
  );
}

export default Header
