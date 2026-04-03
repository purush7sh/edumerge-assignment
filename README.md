
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
