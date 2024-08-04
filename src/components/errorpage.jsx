import { Logo } from './logo.jsx';
import { Link } from 'react-router-dom';
import "../styles/errorpage.css"

export default function ErrorPage() {
  return(
    <div className="errorpage">
      <Logo/>
      <p>404 Page Not Found</p>
      <Link to='/'>Return to homepage</Link>
    </div>
  );
}