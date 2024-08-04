import { Outlet } from 'react-router-dom';
import "../styles/pagetransitions.css"

export default function PageTransitionWrapper() {
  return (
    <div className={"pagetransition fadeIn"}>
      <Outlet />
    </div>
  );
}