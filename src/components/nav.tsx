import Link from 'next/link';

const Nav = () => {

   //console.log(session, isAdmin)
  return (
    <nav className="routes">
          <Link href="/" className="navitems">
            Home
          </Link>
    </nav>
  );
};

export default Nav;