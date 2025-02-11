# Mural Pays Code Challenge

Welcome to the **Mural Pays Code Challenge**! This demo application showcases bank and digital wallet management using Mural Pay's sandbox API. It is built as a Single Page Application (SPA) and demonstrates features such as account creation, login, viewing account details, and initiating transfers.

## Deployed Application

https://muralpaychallenge.vercel.app/

# Important Notes

---

- **Currency & Network:** All transactions are assumed to be in **USDC** using the **Polygon** network.
- **Transfer:** Transfers are processed via blockchain. Although there is an option for fiat transfers added to the app, they will always return a `400 error` with the message: `Offramp provider for USD is not approved. Cannot create transfer request.` I believe this is because all users created in the sandbox share the same bank information.
- **Refresh Functionality:** The application includes a refresh button that updates both the transfer history table and the customer account details.
- **Admin Page:** If you need to check your Customer ID or view wallet information for other customers, navigate to the [/admin page](https://muralpaychallenge.vercel.app/admin). This page displays detailed information for all customers created in the sandbox.

## Description

This application allows you to:

- **Create a New Account:** Sign up to create a new account.
- **Log In:** Log in using your Customer ID.
- **View Account Details:** Once logged in, view your account information and transfer history.
- **Transfer Funds:** Initiate transfers (all transfers are processed in USDC on the Polygon network).

**Note:** On your first login, your account might have limited functionality until you verify your account by clicking the KYC link. **Since this is a sandbox environment, your account will be automatically activated after a few minutes.**

## Environment Setup

For local development, you need to create a `.env` file in the root of the project. Add the following environment variables:

```env
VITE_API_URL=https://api-staging.muralpay.com/api/
VITE_AUTH_API_KEY=muralapikey
VITE_TRANSFER_API_KEY=muraltransferapikey
```

These variables configure the API endpoints and authentication keys for the Mural Pay sandbox.

## Account Creation & Login

1.  **Signup:** Use the Signup page to create a new account.
2.  **Login:** Alternatively, log in using your Customer ID.
3.  **Account Verification:** Once logged in, you'll see your account details. The first time you log in, your account might not display full functionality because you need to verify your account by clicking on the KYC link. Since this is a sandbox environment, your account will be automatically activated after a few minutes.
4.  **Transfers:** After your account is activated, you can view detailed account information and start making transfers.
