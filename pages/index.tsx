import LandingPage from "@/components/LandingPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const router = useRouter();
  const { error } = router.query;
  const { status } = useSession();

  if (error?.toString()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.toString(),
    })
      .then(() => {
        router.push("/");
      })
      .catch(() => { });
  }

  if (status == "authenticated") {
    router.push("/dashboard/core");
  }

  return <LandingPage />;
};

export default Home;
