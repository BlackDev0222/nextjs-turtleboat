import { useRouter } from 'next/router'

const LandingPage = () => {
  const router = useRouter();
  const onLoginBtnClicked = () => {
    router.push('/auth/signin');
  }

  return (
    <div className='bg-[url("/background.jpg")] bg-cover h-screen w-full flex flex-col justify-center items-center'>
      <img
        alt='logo'
        src="/logo.png"
        className='rounded-[15px] shadow-2xl shadow-black opacity-75 w-[120px] h-[120px]' />
      <h1 className='text-4xl text-red-500 font-extrabold mt-10'>Welcome to Turtle Boat!</h1>
      <button
        className={
          `relative mt-5 inline-flex items-center 
          justify-center p-0.5 mb-2 mr-2 overflow-hidden 
          text-sm font-medium text-gray-900 rounded-lg 
          group bg-gradient-to-br from-pink-500 to-orange-400 
          group-hover:from-pink-500 group-hover:to-orange-400 
          hover:text-white dark:text-white focus:ring-4 
          focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`}
        onClick={onLoginBtnClicked}>
        <span
          className={
            `relative px-5 py-2.5 transition-all
             ease-in duration-75 bg-white dark:bg-gray-900 
             rounded-md group-hover:bg-opacity-0`}>
          Please Login
        </span>
      </button>
    </div>
  );
}

export default LandingPage;