import BurgerMenu from "./BurgerMenu"
export default function Header(){
    return(
    <header>
    <nav>
    <ul>
      <BurgerMenu/>
      <h1>
       <a href="#"><img src="/images/logo.png"/></a>    
  </h1>
    </ul>
    </nav>
  </header>
    )
}