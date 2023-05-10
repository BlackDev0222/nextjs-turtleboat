import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Invite = ({
  isAllowed, err, from, image
}: {
  isAllowed: boolean, err: string, from: string, image: string
}) => {
  const router = useRouter();
  useEffect(() => {
    if (isAllowed) {
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: `${from} has invited you to Turtle Boat.`,
        imageUrl: image,
        imageAlt: 'Custom image'
      })
        .then(() => { router.push(`/auth/signin?id=${router.query["id"]}`) })
        .catch(err => console.log(err));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
        .then(() => router.push("/"))
        .catch(err => console.log(err));
    }
  }, [isAllowed])
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
    const { err } = await response.json()
    return { props: { isAllowed: false, err: err } };
  }
  const { from, image } = await response.json();
  return { props: { isAllowed: true, from, image } };
}

export default Invite;