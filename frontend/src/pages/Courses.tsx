import { Link } from '@tanstack/react-router';
import { BookOpen, Clock, IndianRupee, Search } from 'lucide-react';
import { useState } from 'react';
import { useGetAllCourses } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function Courses() {
  const { data: courses, isLoading, error } = useGetAllCourses();
  const [search, setSearch] = useState('');

  const filtered = (courses ?? []).filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-grey-light min-h-screen">
      {/* Page Header */}
      <div className="bg-navy py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            All Courses
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Browse our complete catalog of job-ready training programs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-dark" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-grey-mid"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-12 text-destructive">
            Failed to load courses. Please try again.
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="academy-card p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <div className="flex gap-3 mb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-14 h-14 text-grey-dark mx-auto mb-4" />
            {search ? (
              <p className="text-grey-dark text-lg">No courses match your search.</p>
            ) : (
              <>
                <p className="text-grey-dark text-lg mb-2">No courses available yet.</p>
                <Link to="/admin" className="text-sky-accent hover:underline text-sm">
                  Add courses via Admin Dashboard →
                </Link>
              </>
            )}
          </div>
        )}

        {/* Course Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div key={course.id.toString()} className="academy-card flex flex-col group">
                {/* Card Header */}
                <div className="bg-navy/5 border-b border-grey-mid px-6 py-4">
                  <h2 className="font-display font-semibold text-navy text-lg leading-snug group-hover:text-sky-accent transition-colors">
                    {course.title}
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-grey-dark text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-sm mb-5">
                    <span className="flex items-center gap-1.5 text-grey-dark">
                      <Clock className="w-4 h-4 text-sky-accent" />
                      {course.batchTimings}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-navy">
                      <IndianRupee className="w-3.5 h-3.5" />
                      {Number(course.fees).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/course/$id"
                      params={{ id: course.id.toString() }}
                      className="flex-1 text-center border border-navy text-navy text-sm font-medium py-2.5 rounded-md hover:bg-navy hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to="/checkout/$courseId"
                      params={{ courseId: course.id.toString() }}
                      className="flex-1 text-center bg-navy text-white text-sm font-medium py-2.5 rounded-md hover:bg-navy-dark transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
