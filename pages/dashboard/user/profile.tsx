import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/main/Profile";
import { advancedprofilequestions } from "@/database/advancedprofilequestions";
import { basicprofilequestions } from "@/database/basicprofilequestions";
import { Question } from "@/types/question.type";
import { User } from "@/types/user.type";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Index = ({ basicQuestions, advancedQuestions }: { basicQuestions: Array<Array<Question>>, advancedQuestions: Array<Question> }) => {
  return (
    <DashboardLayout noSelNav={true}>
      <Profile basicQuestions={basicQuestions} advancedQuestions={advancedQuestions} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const basicQuestions = basicprofilequestions;
  const advancedQuestions = advancedprofilequestions;

  if (context.query.sign == "true") {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        }
      }
    }

    const user: User = session.user ?? {};
    if (user.isNewUser == false) {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard/core"
        }
      };
    }

    return {
      props: {
        basicQuestions,
        advancedQuestions,
      },
    };
  }
  return {
    props: {
      basicQuestions,
      advancedQuestions,
    }
  };
};

export default Index;
