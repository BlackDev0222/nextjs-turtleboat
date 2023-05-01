import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Swal from 'sweetalert2'


const Invite = ({ isIllegal }: { isIllegal: boolean }) => {
  const router = useRouter();
  useEffect(() => {
    if (!isIllegal) {
      Swal.fire(
        'Welcome!',
        'You are invited to Turtle Boat.',
        'success',
      )
        .then(() => { router.push(`/auth/signin?id=${router.query["id"]}`) })
        .catch(err => console.log(err));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are accessing illegally!',
      })
        .then(() => router.push("/"))
        .catch(err => console.log(err));
    }
  }, [])
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const response = await fetch(`${process.env.HOME_URL}/api/checkinvite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      linkId: id
    }),
  });

  if (!response.ok) {
    return { props: { isIllegal: true } };
  }
  return { props: { isIllegal: false } };
}

export default Invite;