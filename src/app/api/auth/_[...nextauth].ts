// // eslint-disable-next-line import/no-extraneous-dependencies
// import NextAuth from 'next-auth';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import CredentialsProvider from 'next-auth/providers/credentials';

// import authServiceFactory from '@/services/authServiceFactory';
// import databaseServiceFactory from '@/services/databaseService';

// const dbService = databaseServiceFactory();
// const authService = authServiceFactory();

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: 'Credentials',
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         const ERROR_CREDENTIALS = 'Invalid username and/or password';

//         const { username, password } = req.body as any;

//         try {
//           const userCredentials = await dbService.getUser(username);
//           if (
//             (await authService.validate(password, userCredentials.password)) ===
//             true
//           ) {
//             await saveSession({ username }, req);
//             res.status(200).json({ username });
//             return;
//           }
//         } catch (error) {
//           console.log(error);
//         }

//         const user = await res.json();
//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         }
//         // If you return null then an error will be displayed advising the user to check their details.
//         return null;

//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//       },
//     }),
//   ],
// });
