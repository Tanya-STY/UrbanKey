// import React from "react"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useAuth } from "../Provider/AuthProvider";
// import { ProtectedRoute } from "./ProtectedRoute";
// import Login from "../Components/Authentication/Login.js";
// import SignUp from "../Components/SignUp/SignUp.js";
// import Profile from "../Components/UserProfile/Profile.js";

// const AllRoutes = () => {
//   const { token } = useAuth();

//   //paths for public
//   const routesForPublic = [
//   {
//     path: "/service",
// //    element: <ServicePage/>,
//   },
//   {
//     path: "/about-us",
// //    element: <AboutUs/>,
//   },
//   {
//     path: "/SignUp",
//       element: <SignUp/>,
//   },
//   {
//     path: "/Login",
//       element: <Login />,
//   },
// ];

//   //paths for authenticated users
//   const routesForAuthenticatedOnly = [
//     {
//       path: "/",
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: "/",
// //          element: <HomePage/>,
//         },
//         {
//           path: "/Profile",
//           element: <Profile/>,
//         },
//         {
//           path: "/Logout",
// //          element: <Logout/>,
//         },
//       ],
//     },
//   ];

//   // paths for non-authenticated users
//   const routesForNotAuthenticatedOnly = [
//     {
//       path: "/",
// //      element: <HomePage/>,
//     },
//     {
//       path: "/Login",
//       element: <Login />,
//     },
//   ];

//   return (
// //    <Router>
//       <Routes>
//         {routesForPublic.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//         {!token ? (
//           routesForNotAuthenticatedOnly.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))
//         ) : null}
//         {routesForAuthenticatedOnly.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//       </Routes>
// //    </Router>
//   );
// };

// export default AllRoutes;