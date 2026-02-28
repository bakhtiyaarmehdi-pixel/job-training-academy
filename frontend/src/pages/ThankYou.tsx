import { Link, useSearch } from '@tanstack/react-router';
import { CheckCircle, Home, BookOpen, Mail } from 'lucide-react';

export default function ThankYou() {
  const search = useSearch({ from: '/thank-you' }) as { course?: string };
  const courseName = search.course ?? 'your selected course';

  return (
    <div className="bg-grey-light min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
        </div>

        {/* Graduation Icon */}
        <img
          src="/assets/generated/graduation-icon.dim_128x128.png"
          alt="Graduation"
          className="w-16 h-16 mx-auto mb-4 opacity-80"
        />

        <h1 className="font-display font-bold text-3xl md:text-4xl text-navy mb-3">
          Enrollment Confirmed! 🎉
        </h1>

        <p className="text-grey-dark text-lg mb-2">
          You've successfully enrolled in
        </p>
        <p className="font-display font-semibold text-xl text-sky-accent mb-6">
          {courseName}
        </p>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <div className="academy-card p-4 flex items-start gap-3 text-left">
            <Mail className="w-5 h-5 text-sky-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy text-sm mb-0.5">Check Your Email</p>
              <p className="text-grey-dark text-sm">
                A confirmation has been recorded. You will receive a <strong>Zoom meeting link</strong> at your registered email address once the admin confirms your enrollment.
              </p>
            </div>
          </div>

          <div className="academy-card p-4 flex items-start gap-3 text-left">
            <BookOpen className="w-5 h-5 text-sky-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy text-sm mb-0.5">What's Next?</p>
              <p className="text-grey-dark text-sm">
                Our team will review your enrollment and contact you within 24 hours to confirm your seat and share payment details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-navy-dark transition-colors"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-semibold px-6 py-3 rounded-md hover:bg-navy hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Browse More Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
