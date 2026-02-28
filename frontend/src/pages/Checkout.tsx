import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { ArrowLeft, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useGetCourse, useCreateEnrollment } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface FormData {
  studentName: string;
  email: string;
  phoneNumber: string;
}

interface FormErrors {
  studentName?: string;
  email?: string;
  phoneNumber?: string;
}

export default function Checkout() {
  const { courseId } = useParams({ from: '/checkout/$courseId' });
  const navigate = useNavigate();
  const courseIdBigInt = BigInt(courseId);

  const { data: course, isLoading: courseLoading } = useGetCourse(courseIdBigInt);
  const createEnrollment = useCreateEnrollment();

  const [form, setForm] = useState<FormData>({ studentName: '', email: '', phoneNumber: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.studentName.trim()) newErrors.studentName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !course) return;

    try {
      await createEnrollment.mutateAsync({
        studentName: form.studentName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        courseId: courseIdBigInt,
      });
      navigate({ to: '/thank-you', search: { course: course.title } });
    } catch {
      // error handled by mutation state
    }
  };

  if (courseLoading) {
    return (
      <div className="bg-grey-light min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-48 rounded-lg mb-6" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-light">
        <div className="text-center">
          <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-navy mb-2">Course Not Found</h2>
          <Link to="/courses" className="btn-navy mt-4 inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grey-light min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          to="/course/$id"
          params={{ id: courseId }}
          className="inline-flex items-center gap-2 text-grey-dark hover:text-navy text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </Link>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-navy mb-6">
          Complete Your Enrollment
        </h1>

        {/* Course Summary */}
        <div className="academy-card p-5 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-grey-dark uppercase tracking-wide mb-1">Enrolling in</p>
              <h2 className="font-display font-semibold text-navy text-lg">{course.title}</h2>
              <p className="text-grey-dark text-sm mt-1">{course.batchTimings}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-grey-dark mb-1">Course Fee</p>
              <p className="font-display font-bold text-2xl text-navy">
                ₹{Number(course.fees).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>Note:</strong> Payment gateway integration (Razorpay/Instamojo) requires external credentials not available in this environment. This is a simulated enrollment — your details will be saved and the admin will contact you for payment.
          </AlertDescription>
        </Alert>

        {/* Enrollment Form */}
        <div className="academy-card p-6">
          <h2 className="font-display font-semibold text-navy text-lg mb-5">Your Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="studentName" className="text-navy font-medium mb-1.5 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="studentName"
                type="text"
                placeholder="Enter your full name"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                className={errors.studentName ? 'border-destructive' : ''}
              />
              {errors.studentName && (
                <p className="text-destructive text-xs mt-1">{errors.studentName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-navy font-medium mb-1.5 block">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-navy font-medium mb-1.5 block">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className={errors.phoneNumber ? 'border-destructive' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {createEnrollment.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {createEnrollment.error?.message ?? 'Enrollment failed. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={createEnrollment.isPending}
              className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 h-auto text-base"
            >
              {createEnrollment.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Confirm Enrollment
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
