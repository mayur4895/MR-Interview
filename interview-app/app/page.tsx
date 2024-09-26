import Header from "@/components/Header";
import InitialForm from "@/components/initialForm";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();

 
  if (!user) {
    return <RedirectToSignIn redirectUrl="/sign-in" />;
  }

  
  const profile = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0]?.emailAddress || "",
    },
  });

  let currentUserId;

 
  if (!profile) {
    const newProfile = await db.user.create({
      data: {
        firstname: user.firstName || "",
        lastname: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: "",
        resume: "",
      },
    });
    currentUserId = newProfile.id;
  } else {
    currentUserId = profile.id;  
  }

 
  const interviews = await db.interview.findMany({
    where: {
      userId: currentUserId,
    },
  });

 
  if (interviews.length > 0) {
    return redirect(`/interview/${interviews[0].id}`);
  }

 
  return (
    <>
 
      <InitialForm userId={currentUserId} />
    </>
  );
};

export default Home;
