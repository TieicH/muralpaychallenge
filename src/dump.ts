// import { useEffect, useState } from "react";
// import "./App.css";

// const customerid = "a4e159bb-2a76-4e82-a093-8f0e761d2d6e"; // customer api
// const accountid = "1f2969f5-8e1a-48c4-af86-d541596ae6ed"; // customer api account id
// const walletid = "0x86d0c65c25f78Ca65EB760578C7593D94261E521"; // test customer wallet

// const transferid = "c1de43c5-b42e-4d9b-9400-88b05c0f6386";

// function App() {
//   const [KYCLink, setKYCLink] = useState("");

//   const executeTransferOptions = {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "mural-account-api-key":
//         "835a63a836f36cb02febce84:9f087c052cd947b47d90b49adf6f59301d41c889ae072d3576f4ee196757f99a1d19afb8:628c7ec039c1bf2284e8efc9ce60f70c.e33e4016cda2f75a67e83ea0f67dd11c6bab3b8706a49fbbb1567d2744348e83",
//       "content-type": "application/json",
//       authorization:
//         "Bearer c651ecbe4c1a6b093a9272ed:72f680251494236f9f5b2a46d3a79f2f949744ade8a4845307b745468ee756d6e41c51bd:bee07c2ad690d86dfef4b3d3b1dea019.81a9f7f0a95d14b6a32bec2c3df4ed05c5f63b568a7a9f5222547f85a584a451",
//     },
//     body: JSON.stringify({ transferRequestId: transferid }),
//   };

//   const optionsget = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization:
//         "Bearer c651ecbe4c1a6b093a9272ed:72f680251494236f9f5b2a46d3a79f2f949744ade8a4845307b745468ee756d6e41c51bd:bee07c2ad690d86dfef4b3d3b1dea019.81a9f7f0a95d14b6a32bec2c3df4ed05c5f63b568a7a9f5222547f85a584a451",
//     },
//   };

//   const transferOptions = {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization:
//         "Bearer c651ecbe4c1a6b093a9272ed:72f680251494236f9f5b2a46d3a79f2f949744ade8a4845307b745468ee756d6e41c51bd:bee07c2ad690d86dfef4b3d3b1dea019.81a9f7f0a95d14b6a32bec2c3df4ed05c5f63b568a7a9f5222547f85a584a451",
//     },
//     body: JSON.stringify({
//       payoutAccountId: accountid,
//       recipientsInfo: [
//         {
//           tokenAmount: 1,
//           email: "e.vilela.m@gmail.com",
//           recipientType: "INDIVIDUAL",
//           dateOfBirth: "1994-09-28",
//           name: "testTransfer",
//           recipientTransferType: "BLOCKCHAIN",
//           walletDetails: {
//             blockchain: "POLYGON",
//             walletAddress: "0x86d0c65c25f78Ca65EB760578C7593D94261E521",
//           },
//         },
//       ],
//     }),
//   };

//   const options = {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authorization:
//         "Bearer c651ecbe4c1a6b093a9272ed:72f680251494236f9f5b2a46d3a79f2f949744ade8a4845307b745468ee756d6e41c51bd:bee07c2ad690d86dfef4b3d3b1dea019.81a9f7f0a95d14b6a32bec2c3df4ed05c5f63b568a7a9f5222547f85a584a451",
//     },
//     body: JSON.stringify({
//       organizationType: "BUSINESS",
//       name: "customer api",
//     }),
//   };

//   const createCustomer = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}customers`,
//       options
//     );
//     const data = await response.json();
//     console.log(data);
//   };

//   const getCustomer = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}transfer-requests`,
//       optionsget
//     );
//     const data = await response.json();
//     setKYCLink(data.kycLink);
//   };

//   const createTransfer = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}transfer-requests`,
//       transferOptions
//     );
//     const data = await response.json();
//     console.log({ TRANSFER: data });
//   };

//   const executeTransfer = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}transfer-requests/execute`,
//       executeTransferOptions
//     );
//     const data = await response.json();
//     console.log({ TRANSFER: data });
//   };

//   // useEffect(() => {

//   //   testPing();
//   // }, []);

//   return (
//     <div>
//       <button onClick={createCustomer}>create customer</button>
//       <button onClick={getCustomer}>get customer</button>
//       <button onClick={createTransfer}>CREATE A TRANSFER REQUEST</button>
//       <button onClick={executeTransfer}>EXECUTE A TRANSFER REQUEST</button>
//       <a target="_blank" href={KYCLink}>
//         KYC Link
//       </a>
//     </div>
//   );
// }

// export default App;

// {
//     "id": "6c1ade49-a38e-4f22-a0c2-c326db8a35fe",
//     "createdAt": "2025-02-10T00:53:14.603Z",
//     "updatedAt": "2025-02-10T00:53:14.603Z",
//     "name": "Edison",
//     "customerType": "INDIVIDUAL",
//     "status": "PENDING",
//     "currenciesInfo": []
// }

// {
//     "statusCode": 400,
//     "message": "Offramp provider for USD is not approved. Cannot create transfer request.",
//     "error": "Bad Request"
// }
