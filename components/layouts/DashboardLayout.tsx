import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import LeftSidebar from "../LeftSidebar";
import { useRouter } from "next/router";
import { User } from "@/types/user.type";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>({});

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/");
    } else {
      setUser(session?.user ?? {});
    }
  }, [status]);

  return (
    <>
      <LeftSidebar user={user} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
