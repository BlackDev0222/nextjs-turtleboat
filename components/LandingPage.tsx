import Image from "next/image";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  const onLoginBtnClicked = () => {
    router.push("/auth/signin");
  };

  return (
    <>
      <div className='bg-gray-700 h-screen w-full flex flex-col justify-center items-center py-5 px-2'>
        <Image
          alt="ycities-logo"
          src="/landinglogo.png"
          width={200}
          height={120}
          className="shadow-2xl shadow-[#333333]"
        />
        <Image
          alt="turtleboat-logo"
          src="/turtleboatlogo.jpg"
          width={200}
          height={300}
          className="shadow-2xl shadow-[#333333] mt-5"
        />
        <h1 className="sm:text-4xl text-xl text-[white] font-extrabold mt-10 text-center">
          Welcome to Turtle Boat, powered by yCITIES!
        </h1>
        <button
          className={`text-white bg-gradient-to-r from-green-500 via-green-600 
                  to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
                  dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 
                  font-medium rounded-lg text-sm sm:px-8 px-4 sm:py-4 py-2 text-center sm:mt-10 mt-6`}
          onClick={onLoginBtnClicked}
        >
          <span className={` text-xl font-bold`}>Please Login</span>
        </button>
      </div>
    </>
  );
};

export default LandingPage;
