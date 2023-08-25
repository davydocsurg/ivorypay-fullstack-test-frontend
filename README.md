# IvoryPay Test Frontend

Welcome to the IvoryPay Test Frontend repository! This README provides an overview of the project, its features, setup instructions, and more.

## Project Overview

IvoryPay Test Frontend is a React application that provides a user interface for interacting with the IvoryPay Test Backend. It caters to both User and Admin personas, enabling them to perform various actions according to their roles.

## Personas

### User

A regular user with an account and a wallet can:

-   Accept invitations from their email.
-   Log in using their registered credentials.
-   Deposit funds into their wallet.
-   Transfer funds to other users.
-   Withdraw funds from their wallet.
-   Log out securely.

### Admin

An admin can:

-   Accept invitations, just like regular users.
-   Log in using their admin credentials.
-   Manage users and admins by:
    -   Listing all users and admins.
    -   Inviting new users as regular users or admins.
    -   Disabling and enabling users and admins based on their status.

### Features

-   User Registration: Register as a new user with a unique email.
-   User Authentication: Log in using registered credentials.
-   Invitation Acceptance: Accept invitations sent to your email.
-   Wallet Management: Deposit, transfer, and withdraw funds from your wallet.
-   Admin Controls: Manage users and admins with administrative privileges.

## Getting Started

Follow these steps to set up and run the IvoryPay Test Frontend on your local machine.

### Prerequisites

Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/davydocsurg/ivorypay-test-frontend.git
```

2. Navigate to the project directory:

```bash
cd ivorypay-test-frontend
```

3. Install dependencies:

```bash
yarn install
```

> OR

```bash
npm install
```

### Usage

1. Start the development server:

```bash
yarn dev
```

> OR

```bash
npm run dev
```

This will launch the application in your default web browser.

2. Explore the different features of the IvoryPay Test Frontend by interacting with the user interface.
