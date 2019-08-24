import React from 'react';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
  return (
    <Navbar sticky="top" bg="light">
      <Navbar.Brand href="https://sendwyre.com">Wyre Type Thang: 0.1</Navbar.Brand>
      <Navbar.Text>
        <Link href="#home">
          <a>home</a>
        </Link>
      </Navbar.Text>
    </Navbar>
  )
}

export default Nav 
