import { React, use, useEffect, useState} from 'react'
import { userService } from '../services/user.service';
import styles from '../styles/accountinfo.module.scss'
import { useRouter } from 'next/router'

const AccountInfo = () => {

    const router = useRouter()

    const[displayEmail, setDisplayEmail] = useState(null);
    const[errorPasswordMessage, setErrorMsg] = useState(null);
    const[successPasswordMessage, setSuccessMsg] = useState(null);
    const[loading, setLoading] = useState(false);
    const[showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(!userService.protectRoute) router.push('/home');
        if(localStorage.getItem('email')) setDisplayEmail(localStorage.getItem('email'));
    })

    function changePassword(e) {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        if(password.value !== confirmPassword.value) {
            setErrorMsg('Passwörter müssen übereinstimmen!');
            return;
        }
        setLoading(true);
        userService.changePassword(password.value).then(res => {
            setLoading(false);
            setSuccessMsg('Passwort wurde erfolgreich geändert!')
        }, err => {
            setLoading(false);
            setErrorMsg(err);
        });
    }

    function showChangePasswordForm() {
        showForm ? setShowForm(false) : setShowForm(true);
    }

    return (
        <div className='d-flex flex-column align-items-center gap-4'>
            <section className="container d-flex flex-column justify-content-center align-items-center mt-5 gap-1">
                <i className={`bi bi-person-circle ${styles.biPersonCircle}`}></i>
                <h3 >{displayEmail}</h3>
                {!showForm ? 
                    <button className="btn btn-primary" onClick={showChangePasswordForm}>Passwort ändern</button>
                    : <></>
                }
            </section>

            {showForm ? 
                <form className={styles.changePasswordForm} onSubmit={changePassword}>
                    <div className={styles.close} onClick={showChangePasswordForm}>
                    </div>
                    <div className="mb-3">
                        <label for="id_password" className="form-label">Passwort</label>
                        <input type="password" className="form-control" id="password" minLength={8} required/>
                    </div>
                    <div className="mb-3">
                        <label for="id_passwordConfirmed" className="form-label">Passwort bestätigen</label>
                        <input type="password" className="form-control" id="confirmPassword" minLength={8} required/>
                    </div>
                    {errorPasswordMessage ? <h5 className="text-center text-danger">{errorPasswordMessage}</h5> : <h5 className="text-center text-success">{successPasswordMessage}</h5>}
                    <button type="submit" className=" mt-3 btn btn-primary w-100 d-flex align-items-center gap-2 justify-content-center" >Passwort ändern {loading ? <div className="spinner-border text-light" role="status">
                    </div> : <></>}</button>
                </form> :
                <></>
            }
            
        </div>
        
    )
}

export default AccountInfo