import {ReactComponentElement, useState} from 'react'
import { userService } from '../services/user.service';
import styles from '../styles/registration.module.scss'


const registration = () => {

  const [loadingRegistration, setLoadingRegistration] = useState(false)
  const [showErrorMg, setErrorMg] = useState(null)
  const [registerSuccess, setRegisterSuccess] = useState(false)


  function submitRegistration(e) {
    e.preventDefault();
    setErrorMg(null);

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    if(password.value !== confirmPassword.value) {
      setErrorMg("Passwörter müssen übereinstimmen!")
      return;
    }
    setLoadingRegistration(true)
    userService.registration(email.value, password.value).then((res) => {
      setErrorMg("Registrierung war erfolgreich!");
      setLoadingRegistration(false);
      setRegisterSuccess(true);
    }).catch((err) => {
      setErrorMg(err);
      setLoadingRegistration(false);
      setRegisterSuccess(false);
    });
  }

  return (
    <section className="container-sm mt-5 bg-white p-5">
      <h3 className="text-center" i18n>Registrierung</h3>
      <form onSubmit={submitRegistration}>
        <div className="mb-3">
          <label for="id_email" className="form-label" >Email Adresse</label>
          <input type="email" className="form-control" id="email" required/>
        </div>
        <div className="mb-3">
          <label for="id_Password" className="form-label" >Passwort</label>
          <input type="password" className="form-control" id="password" required minLength={8}/>
        </div>
        <div className="mb-3">
          <label for="id_Password" className="form-label">Passwort bestätigen</label>
          <input type="password" className="form-control" id="confirmPassword" required minLength={8}/>
        </div>
          <h5 className="text-center text-danger"></h5>
          <button type="submit" className="mt-3 btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" i18n>Registrieren{loadingRegistration ? <div  className={`spinner-border text-light ${styles.spinnerSize}`} role="status">
      </div> : <></>}</button>
      {registerSuccess ? <h5 className={`text-center text-success mt-3 ${styles.textDanger}`}>{showErrorMg}</h5> : <h5 className={`text-center text-danger mt-3 ${styles.textDanger}`}>{showErrorMg}</h5>}
      
      </form>
    </section>
  )
}

export default registration