

import { Button } from '@mantine/core';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import { MdKeyboardArrowRight } from "react-icons/md"
import { FaDiscord } from "react-icons/fa"
import ThemeToogle from '../components/common/ThemeToogle';
import Contacts from '../components/common/Contacts';

export default function Home({ demoJWT }: { demoJWT: string }) {

  return (
    <>

      <div className="login">
        <ThemeToogle className="theme_toogle" />

        <div className="welcome">
          <h1>Bienvenue sur Olympus !</h1>
          <p>Olympus est un ensemble de mini-projets-tuto regroupés en une application fonctionelle.</p>
          <Contacts className="contacts" />

        </div>

        <div className="signin">
          {/* <p>Form</p> */}
          <Button
            component='a'
            color="dark"
            className="discord_signin"
            href="http://localhost:3000/auth/discord?redirect=http://localhost:3001/app/hermes">
            <FaDiscord size={20} className="icon" />
            Me connecter avec Discord
          </Button>
          <Button
            className="demo"
            component='a'
            color="dark"
            href={`/app/hermes?accessToken=${demoJWT}`}>
            <MdKeyboardArrowRight size={35} />
            Voir la démo
          </Button>
        </div>

      </div>

    </>
  );

}



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const baseURL = process.env.API_URL
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "demo.ekawa@gmail.com",
      password: "demoolympus"
    })
  })
  const data = await res.json()

  return {
    props: {
      demoJWT: JSON.parse(JSON.stringify(data.accessToken))
    }
  }
}