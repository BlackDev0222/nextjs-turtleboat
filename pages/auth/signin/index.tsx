import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const metadata: any = {
    inviteId: router.query.id?.toString() ?? "",
  };
  const onGoogleBtnClicked = () => {
    signIn("google", { callbackUrl: "/dashboard/user/profile?sign=true" }, metadata);
  };
  const onLinkedinBtnClicked = () => {
    signIn("linkedin", { callbackUrl: "/dashboard/user/profile?sign=true" }, metadata);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-700">
      <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto sm:w-[450px] w-full">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="flex flex-col space-y-4 justify-center items-center">
                <div className="flex justify-center items-center space-x-8 mb-4">
                  <Image
                    alt=""
                    src="/landinglogo.png"
                    width={225}
                    height={120}
                    className="shadow-2xl shadow-[#666666]"
                  />
                  {/* <Image
                    alt=""
                    src="/turtleboatlogo.jpg"
                    width={80}
                    height={120}
                    className="shadow-2xl shadow-[#666666]"
                  /> */}
                </div>
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Welcome!
                </h2>
                <h2 className="mb-8 text-[16px] text-cyan-900 font-bold text-center">
                  {`If you are over 18, please log in via LinkedIn. 
                  If you are over 16, we encourage you to create a LinkedIn profile and log in via LinkedIn.`}
                </h2>
              </div>
              <div className="mt-8 grid space-y-4">
                <button
                  className={`group h-12 px-6 border-2 border-gray-300 
                    rounded-full transition duration-300  
                    hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100`}
                  onClick={onLinkedinBtnClicked}
                >
                  <div className="relative flex items-center space-x-10 justify-start">
                    <Image
                      alt="google logo"
                      src="/linkedin.svg"
                      width={24}
                      height={24}
                      className="absolute left-0"
                    />
                    <span
                      className={`block w-max font-semibold tracking-wide 
                        text-gray-700 text-sm transition duration-300 
                        group-hover:text-blue-600 sm:text-base`}
                    >
                      Continue with Linkedin
                    </span>
                  </div>
                </button>
                <button
                  className={`group h-12 px-6 border-2 border-gray-300 
                    rounded-full transition duration-300  hover:border-blue-400 
                    focus:bg-blue-50 active:bg-blue-100`}
                  onClick={onGoogleBtnClicked}
                >
                  <div className="relative flex items-center space-x-10 justify-start">
                    <Image
                      alt="google logo"
                      src="/google.svg"
                      width={24}
                      height={24}
                      className="absolute left-0"
                    />
                    <span
                      className={`block w-max font-semibold tracking-wide 
                      text-gray-700 text-sm transition duration-300 
                      group-hover:text-blue-600 sm:text-base`}
                    >
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
