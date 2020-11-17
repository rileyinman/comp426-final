import Navbar from 'react-bulma-components/lib/components/navbar';

import MainNav from './MainNav';
import AuthNav from './AuthNav';

const NavBar = () => (
  <Navbar fixed='top' transparent={true}>
    <Navbar.Menu>
      <MainNav/>
      <AuthNav/>
    </Navbar.Menu>
  </Navbar>
)

export default NavBar;
