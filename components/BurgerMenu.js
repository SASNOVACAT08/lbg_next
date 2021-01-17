

function BurgerMenu() {
    return (
        <div>
        <div className="nav">
          <label for="toggle">&#9776; </label>
          <input type="checkbox" id="toggle"/>
          
          <div className="menu">
             <a href="#">Games</a>
             <a href="#">Events</a>
             <a href="#">Contact</a>
             <a href="#">About</a>
          </div>
        </div>
  </div>
    )
  
  }
  export default BurgerMenu