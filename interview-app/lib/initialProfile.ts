// // lib/initialProfile.js
// import { db } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";
// import { RedirectToSignIn } from "@clerk/nextjs";

// export const initialProfile = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return RedirectToSignIn({ redirectUrl: "/sign-in" });
//   }

//   // Make sure to extract the ID correctly
//   const userId = user.id; // This ID should be a valid MongoDB ObjectID

//   const profile = await db.user.findUnique({
//     where: {
//       id: userId, // Ensure this is the correct ID format
//     },
//   });

//   if (profile) {
//     return profile;
//   }

//   const newProfile = await db.user.create({
//     data: {
//       id: userId, // Ensure the id is set properly
//       firstname: user.firstName || "",
//       lastname: user.lastName || "",
//       email: user.emailAddresses[0]?.emailAddress || "",
//       resume:"",
//       phone:""
//     },
//   });

//   return newProfile;
// };
