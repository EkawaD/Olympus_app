
export default function Home({ demoJWT }: { demoJWT: string }) {

  return (
    <>

      <div className="welcome">

        Bienvenue sur Olympus !

        <a href="http://localhost:3000/auth/discord?redirect=http://localhost:3001/home">DISCORD LOGIN</a>
        <a href={`/home?accessToken=${demoJWT}`}>Voir la démo !</a>
      </div>

    </>
  );

}



import { GetServerSideProps } from 'next'

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