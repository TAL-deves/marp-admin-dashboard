// import React,{ useEffect, useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import { getRequestHandler } from 'src/apiHandler/customApiHandler';


// const account = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [url, setUrl]=useState("")
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [role, setRole]=useState("")

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     // setShow(true);
//     async function getData() {
//       const adminProfile = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile`);
//       // setData(adminProfile.data);
//       setUrl(adminProfile.data.profile.profilePhotoBucketURL);
//       setRole(adminProfile.data.role);
//       // setPhoneNumber(adminProfile.data.phoneNumber);
//       // setEmail(adminProfile.data.email);
//       // console.log("admin Profile url role",adminProfile.data, url, role);
//       // setShow(false);
//     }
//     getData();
//   }, []);


//   const account = {
//     displayName: {role},
//     email: 'admin@gmail.com',
//     photoURL:{url},
//   };
//   return (
//     <div>
//       <h1>Hello Account</h1>
//     </div>
//   );
// };

// export default account;
