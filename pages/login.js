import React, { useState } from 'react'
import Navbar from '../components/navbar'

import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../services/user.service';
import styles from '../styles/login.module.scss'

const login = () => {


  const router = useRouter();

  //   // form validation rules 
  //   const validationSchema = Yup.object().shape({
  //       username: Yup.string().required('Username is required'),
  //       password: Yup.string().required('Password is required')
  //   });
  //   const formOptions = { resolver: yupResolver(validationSchema) };

  //   // get functions to build form with useForm() hook
  //   const { register, handleSubmit, formState } = useForm(formOptions);
  //   const { errors } = formState;

  //   function onSubmit({ username, password }) {
  //     return userService.login(username, password)
  //         .then(() => {
  //             // get return url from query parameters or default to '/'
  //             const returnUrl = router.query.returnUrl || '/';
  //             router.push(returnUrl);
  //         })
  //         .catch(alertService.error);
  // }
  const [loadingLogging, setLogging] = useState(false)
  const [showErrorMg, setErrorMg] = useState(null)

  function submitLogin(e) {
    setErrorMg(null);
    setLogging(true)
    e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    userService.login(email.value, password.value).then((res) => {
      setLogging(false);
      router.push('/accountinfo');
    }).catch((err) => {
      console.log(err)
      setErrorMg(err)
      setLogging(false)
    });
  }

  return (
  <div>
    <section className="container-sm mt-5 bg-white p-5">
    <h3 className="text-center">Anmeldung</h3>
    <form onSubmit={submitLogin}>
      <div className="mb-3">
        <label for="id_email" className="form-label">Email Adresse</label>
        <input id="email" type="email"
          className="form-control" required/>
        {/* <div *ngIf="email.touched && email.hasError('required')" className="d-block invalid-feedback" i18n>Bitte geben Sie eine Email an.</div>
        <div *ngIf="email.touched && email.hasError('email')" className="d-block invalid-feedback" i18n>Email
          Adresse ist nicht gültig.</div> */}
      </div>
      <div className="mb-3">
        <label for="id_Password" className="form-label">Passwort</label>
        <input id="password"
          type="password" className="form-control" required/>
        {/* <div *ngIf="password.touched && password.hasError('required')" className="d-block invalid-feedback" i18n>
          Bitte geben Sie ein Passwort an.</div> */}
      </div>
      {/* <h5 className="text-center text-danger">{{errorMessage}}</h5> */}
      <button type="submit" className=" mt-3 btn btn-primary w-100 d-flex align-items-center gap-2 justify-content-center">Anmelden{loadingLogging ? <div  className={`spinner-border text-light ${styles.spinnerSize}`} role="status">
      </div> : <></>}</button>
      <h5 className={`text-center text-danger mt-3 ${styles.textDanger}`}>{showErrorMg}</h5>
    </form>
  </section>
  </div>

  )
}

export default login