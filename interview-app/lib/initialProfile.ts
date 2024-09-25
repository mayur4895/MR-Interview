// // lib/initialProfile.js
// import { db } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";
// import { RedirectToSignIn } from "@clerk/nextjs";

// export const initialProfile = async () => {
//   const user = await currentUser();

//   // Check if the user is authenticated
//   if (!user) {
//     return RedirectToSignIn({ redirectUrl: "/sign-in" });
//   }

//   // Check if a profile already exists for this user
//   const profile = await db.profile.findUnique({
//     where: {
//       userId: user.id,
//     },
//   });

//   // If profile exists, return it
//   if (profile) {
//     return profile;
//   }

//   // If no profile exists, create a new one
//   const newProfile = await db.profile.create({
//     data: {
//       userId: user.id,
//       name: `${user.firstName} ${user.lastName}`,
//       email: user.emailAddresses[0]?.emailAddress || null,
//     },
//   });

//   return newProfile;
// };
