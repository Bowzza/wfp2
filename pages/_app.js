import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { userService } from '../services/user.service'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    userService.autoAuthUser();
  })

  return (
    <Layout>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"/>
      {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script> */}
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
