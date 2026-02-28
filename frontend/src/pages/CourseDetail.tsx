import { useParams, Link } from '@tanstack/react-router';
import {
  ArrowLeft, Clock, IndianRupee, User, BookOpen,
  CheckCircle, Video, AlertCircle
} from 'lucide-react';
import { useGetCourse } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function CourseDetail() {
  const { id } = useParams({ from: '/course/$id' });
  const courseId = BigInt(id);
  const { data: course, isLoading, error } = useGetCourse(courseId);

  if (isLoading) {
    return (
      <div className="bg-grey-light min-h-screen">
        <div className="bg-navy py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-2/3 bg-white/20 mb-3" />
            <Skeleton className="h-5 w-1/2 bg-white/10" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="academy-card p-6">
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className="h-64 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-light">
        <div className="text-center">
          <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-navy mb-2">Course Not Found</h2>
          <p className="text-grey-dark mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="btn-navy">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-grey-light min-h-screen">
      {/* Header */}
      <div className="bg-navy py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            {course.title}
          </h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            {course.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Badge className="bg-white/15 text-white border-white/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {course.batchTimings}
            </Badge>
            <Badge className="bg-white/15 text-white border-white/20 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {course.trainerName}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Full Description */}
            <div className="academy-card p-6">
              <h2 className="font-display font-semibold text-xl text-navy mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-accent" /> About This Course
              </h2>
              <p className="text-grey-dark leading-relaxed whitespace-pre-line">
                {course.fullDescription}
              </p>
            </div>

            {/* Syllabus */}
            {course.syllabus.length > 0 && (
              <div className="academy-card p-6">
                <h2 className="font-display font-semibold text-xl text-navy mb-4">
                  📋 Course Syllabus
                </h2>
                <ol className="space-y-3">
                  {course.syllabus.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy/10 text-navy text-xs font-semibold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-grey-dark text-sm leading-relaxed pt-1">{topic}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Trainer */}
            <div className="academy-card p-6">
              <h2 className="font-display font-semibold text-xl text-navy mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-sky-accent" /> Your Trainer
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {course.trainerName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-base mb-1">{course.trainerName}</h3>
                  <p className="text-grey-dark text-sm leading-relaxed">{course.trainerBio}</p>
                </div>
              </div>
            </div>

            {/* Batch Timings */}
            <div className="academy-card p-6">
              <h2 className="font-display font-semibold text-xl text-navy mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-accent" /> Batch Timings
              </h2>
              <p className="text-grey-dark">{course.batchTimings}</p>
            </div>

            {/* Zoom */}
            {course.zoomLink && (
              <div className="academy-card p-6 border-l-4 border-sky-accent">
                <h2 className="font-display font-semibold text-xl text-navy mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5 text-sky-accent" /> Online Classes via Zoom
                </h2>
                <p className="text-grey-dark text-sm">
                  Live classes are conducted via Zoom. You'll receive the meeting link after enrollment confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="academy-card p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-grey-dark text-sm mb-1">Course Fee</p>
                <p className="font-display font-bold text-4xl text-navy flex items-center justify-center gap-1">
                  <IndianRupee className="w-7 h-7" />
                  {Number(course.fees).toLocaleString('en-IN')}
                </p>
              </div>

              <Link
                to="/checkout/$courseId"
                params={{ courseId: course.id.toString() }}
                className="block w-full text-center bg-navy text-white font-semibold py-3.5 rounded-md hover:bg-navy-dark transition-colors mb-4"
              >
                Enroll Now
              </Link>

              <div className="space-y-3 pt-4 border-t border-grey-mid">
                {[
                  'Live Zoom classes',
                  'Recorded sessions',
                  'Certificate on completion',
                  'Placement assistance',
                  'Lifetime access to materials',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-grey-dark">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
