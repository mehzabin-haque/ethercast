import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Landing from '../components/PageComponents/Landing'
import Admin from '../components/Dashboard/Admin'
import Test from '../components/Utilities/Test'
import EditProfile from '../components/Utilities/Profile'
import Result from '../components/Utilities/Result/DynamicDonought'

export default function Home() {
  return (
    <>            
      {/* <Landing />   */}
      {/* <Test /> */}
      {/* <EditProfile />  */}
      {/* <Result /> */}
      <Admin />
    </>
  )
}
