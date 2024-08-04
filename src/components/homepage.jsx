import { Logo, AnimLogo } from "./logo";
import { Link } from "react-router-dom";
import dragonImage from '../assets/dragon.png';
import "../styles/homepage.css"

export default function Home() {
  return (
    <div className="homepage">
      <header>
        <Logo />
        <Link to='/shop'><button>Shop Now!</button></Link>  
      </header>
      <main>
        <AnimLogo />
        <p>
          This is a gaming shopping cart. Shop from here please please please
          don't prove I'm right Please please please Don't bring me to tears
          when I just did my makeup so nice Heartbreak is one thing My egos
          another I beg you don't embarass me MF ahhh Please please please.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          dolorum corporis necessitatibus culpa blanditiis tempore optio quo
          eius nobis, quia dolores illum labore! Corporis id, aperiam quo
          maiores odit praesentium?
        </p>
        <Link to='/shop'><button>Shop Now!</button></Link>
        <img src={dragonImage} alt="Red Dead Redemption dragon" />
      </main>
    </div>
  );
}
