import LandingPage from "@/components/LandingPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/dashboard/core");
    }
  }, [status]);

  if (router.query.error == "AccessDenied") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please contact a support team!",
    });
  }

  return <LandingPage />;
};

export default Home;
