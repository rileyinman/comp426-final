import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

const MainNav = () => (
  <Navbar.Container>
    <Navbar.Item renderAs='div'>
      <Navbar.Link arrowless={true}>
        <Link to='/'>Home</Link>
      </Navbar.Link>
    </Navbar.Item>

    <Navbar.Item renderAs='div'>
      <Navbar.Link arrowless={true}>
        <Link to='/profile'>Profile</Link>
      </Navbar.Link>
    </Navbar.Item>
  </Navbar.Container>
)

export default MainNav;
