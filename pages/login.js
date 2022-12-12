import React from 'react'
import Navbar from '../components/navbar'



const login = () => {
  return (
  <div>
    <section className="container-sm mt-5 bg-white p-5">
    <h3 className="text-center">Anmeldung</h3>
    <form>
      <div className="mb-3">
        <label for="id_email" className="form-label">Email Adresse</label>
        <input formControlName="email" type="email"
          className="form-control" />
        {/* <div *ngIf="email.touched && email.hasError('required')" className="d-block invalid-feedback" i18n>Bitte geben Sie eine Email an.</div>
        <div *ngIf="email.touched && email.hasError('email')" className="d-block invalid-feedback" i18n>Email
          Adresse ist nicht gültig.</div> */}
      </div>
      <div className="mb-3">
        <label for="id_Password" className="form-label">Passwort</label>
        <input formControlName="password"
          type="password" className="form-control" />
        {/* <div *ngIf="password.touched && password.hasError('required')" className="d-block invalid-feedback" i18n>
          Bitte geben Sie ein Passwort an.</div> */}
      </div>
      {/* <h5 className="text-center text-danger">{{errorMessage}}</h5> */}
      <button type="submit" className=" mt-3 btn btn-primary w-100 d-flex align-items-center gap-2 justify-content-center">Anmelden<div  className="spinner-border text-light" role="status">
      </div></button>
    </form>
  </section>
  </div>

  )
}

export default login