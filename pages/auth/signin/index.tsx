import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const metadata: any = {
    inviteId: router.query.id?.toString() ?? "",
  };
  const onGoogleBtnClicked = () => {
    signIn("google", { callbackUrl: "/dashboard/core" }, metadata);
  };
  const onLinkedinBtnClicked = () => {
    signIn("linkedin", { callbackUrl: "/dashboard/core" }, metadata);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-red-300">
      <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto w-[450px]">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="flex flex-col space-y-4 justify-center items-center">
                <Image
                  alt=""
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Welcome!
                </h2>
                <h2 className="mb-8 text-[16px] text-cyan-900 font-bold text-center">
                  {`We strongly encourage you to create a Linkedin account if you don't have one already`}
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
                    <img
                      src="/linkedin.svg"
                      className="absolute left-0 w-6"
                      alt="google logo"
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
                    <img
                      src="/google.svg"
                      className="absolute left-0 w-6"
                      alt="google logo"
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
