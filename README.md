<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# edumerge-assignment

📌 Admission Management & CRM (Assignment)

🚀 Tech Stack
Next.js (App Router)
MongoDB (Mongoose)
Material UI

⚙️ Setup Instructions
git clone <your-repo-link>
cd edumerge-assignment
npm install
npm run dev

🌐 Application URLs
Home: http://localhost:3000
Program Setup: /program
Applicant: /applicant
Allocation: /allocation
Admission: /admission
Dashboard: /dashboard

✅ Features Implemented
1. Master Setup
Create Program with Intake & Quotas
Quota validation (total = intake)
2. Applicant Management
Create applicant with:
Name, Category, Entry Type
Quota Type
Marks
Document Status
3. Seat Allocation
Allocate seat based on quota
Prevent overbooking
Real-time seat tracking
4. Admission Workflow
Step 1: Allocate seat
Step 2: Mark fee as Paid
Step 3: Confirm admission
5. Admission Number

Format:

INST/2026/UG/{Program}/{Quota}/0001
Generated only after confirmation
Unique & immutable
6. Fee Management
Pending / Paid
Confirmation allowed only if Paid
7. Dashboard
Total intake vs admitted
Quota-wise seats
Remaining seats
Pending documents
Fee pending
🔒 Business Rules Implemented
No seat overbooking
Quota-wise seat control
Admission number generated only once
Admission confirmed only after fee payment
Real-time seat updates


🤖 AI Usage Disclosure
AI tools (ChatGPT) were used for:

Guidance on architecture and flow
Debugging issues
UI improvements

All core logic, implementation, and understanding were handled independently.
>>>>>>> cc71dd1c17f78c64e58fb63dd50bac441802794c
