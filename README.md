# Apex Care Hospital Enquiry Website

A modern, mobile-first, and accessible Hospital Enquiry Website built with **Next.js (App Router)** and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Accessible, Mobile-First Design**:
   - Clean, high-contrast healthcare color palette (Medical Navy, Clinical Blue, Emergency Crimson, Slate, Crisp White).
   - Large base typography (min 16–18px body copy), high contrast text ratios (WCAG AA/AAA compliant).
   - Accessible keyboard focus rings (`focus-visible`) and "Skip to main content" link for screen readers.

2. **Global Emergency Header (Every Page)**:
   - High-visibility red alert banner with clickable 24/7 Emergency & Ambulance numbers (`tel:...`).
   - Hospital branding, full responsive navigation menu, and mobile hamburger slide-out drawer.
   - Prominent, high-contrast **"Book Appointment"** CTA button.

3. **Floating AI Enquiry Chatbot (Every Page)**:
   - Fixed bottom-right launcher button with pulsing online activity indicator.
   - Interactive chat window with online status, quick enquiry chips (*"Emergency number"*, *"Visiting hours"*, *"Book appointment"*, *"Insurance accepted"*).
   - Instant simulated conversational replies powered directly by `hospitalData.json`.
   - Text input for custom enquiries and direct action buttons.

4. **Decoupled Data Layer (`data/hospitalData.json`)**:
   - Easily editable JSON file containing:
     - Hospital metadata (names, hotline numbers, email, address, visiting hours)
     - 8 clinical departments (procedures, head of dept, bed capacity, OPD hours)
     - 10 specialist doctors (specialties, room numbers, consultation fees, available days)
     - Ward visiting hours & infection control rules
     - Empanelled cashless insurance partners & TPAs
     - Comprehensive billing & visitor FAQs
     - Chatbot quick suggestion prompts

5. **Global Footer (Every Page)**:
   - Physical address with landmarks.
   - 24/7 Emergency, General Enquiry, and Ambulance phone numbers.
   - Email addresses and OPD timings.
   - Ward visiting hours overview.
   - Quick navigation links and accreditation badges (JCI & NABH).

---

## 📄 Pages Included

| Page | Route | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Emergency hero banner, quick actions, featured departments, top specialists, and accreditation trust signals |
| **Departments** | `/departments` | Searchable & filterable directory of medical specialties, procedures performed, and OPD schedules |
| **Doctors** | `/doctors` | Search by doctor name, filter by department and available day, doctor bios, consultation fees, and booking CTAs |
| **Book Appointment** | `/book-appointment` | Interactive booking form with dynamic doctor/department dropdowns, date & slot picker, and instant appointment token generation |
| **Visitor Info** | `/visitor-info` | Ward-wise visiting hours table (General, ICU, Pediatric, Maternity), visitor guidelines, and campus amenities |
| **Billing & Insurance** | `/billing-insurance` | 4-step cashless claim workflow, empanelled insurance partners/TPAs, accepted payment modes, and billing FAQs |
| **Contact** | `/contact` | Emergency hotline cards, departmental phone extension directory, interactive contact form, and transit directions |

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## ✏️ How to Edit Content & Data

To add or update doctors, departments, visiting hours, or emergency numbers:
1. Open [`data/hospitalData.json`](./data/hospitalData.json).
2. Edit the corresponding entries.
3. Save the file — Next.js will automatically update the pages and chatbot replies!
