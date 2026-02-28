# Specification

## Summary
**Goal:** Build a full job training academy website (SkillUp Academy) with public-facing pages, an enrollment flow, and an admin dashboard for managing courses and enrollments.

**Planned changes:**
- **Home page** with headline "Upgrade Your Skills. Get Job Ready.", academy intro, 3–4 featured course highlights, "Enroll Now" CTA buttons, student testimonials section, and footer with contact details and social links
- **Courses page** displaying all courses in a responsive card/grid layout (title, description, duration, fees, Enroll Now button); each card links to its Course Detail page
- **Course Detail page** (route `/courses/:id`) showing full description, syllabus topics, trainer name and bio, batch timings, pricing, and an "Enroll Now" button
- **Checkout/Enrollment flow** triggered by "Enroll Now": form collecting name, email, phone; on submit creates an enrollment record (status: pending) in the backend and redirects to /thank-you; note displayed about payment gateway (Razorpay/Instamojo) requiring external credentials
- **Thank You page** (`/thank-you`) showing confirmation, enrolled course name, and instruction to check email for Zoom link
- **Contact page** with contact form (Name, Email, Phone, Message), WhatsApp click-to-chat button, clickable phone/email links, and a labeled Google Maps placeholder section
- **Admin Dashboard** (`/admin`, no authentication) with: course list (edit/delete), add/edit course forms (all fields including Zoom link), enrollments table (name, email, course, payment status), and ability to mark enrollments as paid
- **Backend actor** with Course model (title, short description, full description, syllabus array, trainer name, trainer bio, batch timings, fees, Zoom link) and CRUD methods; Enrollment model (student name, email, phone, course ID, payment status, timestamp) with createEnrollment and getEnrollments methods
- **Global visual theme**: sticky nav bar (Home, Courses, Contact, Admin) with hamburger menu on mobile, navy blue (#1E3A5F) / white / light grey palette, clean sans-serif typography, card-based layouts with subtle shadows, fully mobile-responsive

**User-visible outcome:** Visitors can browse courses, view course details, and submit an enrollment form with a confirmation page. An admin can manage all courses and enrollments via the /admin dashboard.
