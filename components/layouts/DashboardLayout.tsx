import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import LeftSidebar from "../LeftSidebar";
import { useRouter } from "next/router";
import useUserStore from "@/stores/useUserStore";

const DashboardLayout = ({ noSelNav, children }: { noSelNav?: boolean, children: ReactNode }) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      setUser(session.user ?? {});
    } else if (status == "unauthenticated") {
      router.push("/");
    }
  }, [status])

  if (status == "authenticated") {
    return (
      <>
        <LeftSidebar noSelNav={noSelNav} />
        <main className="sm:ml-28 md:px-[100px] sm:px-[60px] px-[15px] py-[40px] overflow-auto">{children}</main>
      </>
    );
  }

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default DashboardLayout;
