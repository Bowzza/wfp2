import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { userService } from '../services/user.service'
import { useRouter } from 'next/router';


const Navbar = () => {
  const darkMode = false;
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter();

  useEffect(() => {
    userService.returnAuthListener().subscribe((res) => {
      setLoggedIn(res)
    });
  }, [])

  function logout () {
    userService.logout();
    router.push('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-success">
    <div className="container">
      <Link className="navbar-brand text-light" href="/home">Ebay - Shpock Scraper</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
          <li className="nav-item">
            <Link className={`nan-link active text-light me-3 ${styles.navLink}`} href="/home">Startseite</Link>
          </li>
          <li className="nav-item" id="navSearchItem">
            <Link className={`nan-link active text-light me-3 ${styles.navLink}`} href="/searchResults">Suchen</Link>
          </li>
          {loggedIn ? <li className="nav-item" id="navSearchItem">
            <Link className={`nan-link active text-light me-3 ${styles.navLink}`} href="/accountinfo">Accountinfo</Link>
          </li> : <></>}

          {/* <app-cart *ngIf="isAuth" [routerLink]="['/wishlist']" class="me-4 ms-2"></app-cart> */}
          <div className={`${styles.themeMode} position-absolute`}>
            {darkMode ? <img className={styles.themeModeImg} src="darkmode.svg" alt="darkmode" /> 
            : <img className={styles.themeModeImg} src="lightmode.svg" alt="lightmode" />}
          </div>
        </ul>

        <select className={`form-select me-2 ${styles.selectWidth}`} aria-label="Default select example">
          <option>Sprache auswählen</option>
          <option value="de">Deutsch</option>
          <option value="en">Englisch</option>
        </select>
        {loggedIn ? <button onClick={logout} className="me-2 btn btn-light" data-bs-toggle="modal" data-bs-target="#loginModal">Abmelden</button> 
        : <div>
          <Link className="me-2 btn btn-light" href="/login">Anmelden</Link> 
          <Link className="btn btn-light" href="/registration">Registrieren</Link>
          </div>}
      </div>
    </div>


  </nav>
  )
}

export default Navbar
