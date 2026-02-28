import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle, Star, Users, BookOpen, Award } from 'lucide-react';
import { useGetAllCourses } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Developer at TCS',
    quote: 'SkillUp Academy transformed my career. The hands-on training and expert mentors helped me land my dream job within 3 months of completing the course.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Data Analyst at Infosys',
    quote: 'The curriculum is perfectly aligned with industry requirements. I went from zero knowledge to job-ready in just 6 weeks. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Anita Patel',
    role: 'Digital Marketing Manager',
    quote: 'Excellent trainers, practical assignments, and great placement support. The live Zoom classes made learning flexible and convenient.',
    rating: 5,
  },
];

const stats = [
  { icon: Users, value: '5,000+', label: 'Students Trained' },
  { icon: BookOpen, value: '20+', label: 'Courses Available' },
  { icon: Award, value: '95%', label: 'Placement Rate' },
  { icon: CheckCircle, value: '50+', label: 'Hiring Partners' },
];

export default function Home() {
  const { data: courses, isLoading } = useGetAllCourses();
  const featuredCourses = courses?.slice(0, 3) ?? [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1200x400.png')" }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <Badge className="mb-5 bg-sky-accent/20 text-sky-accent border-sky-accent/30 text-sm px-4 py-1">
            #1 Job Training Academy
          </Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Upgrade Your Skills.<br />
            <span className="text-sky-accent">Get Job Ready.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Industry-focused training programs designed to fast-track your career. Learn from experts, get certified, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-sky-accent text-white font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-base"
            >
              Explore Courses <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-base"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-grey-mid">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="w-6 h-6 text-sky-accent mb-2" />
                <span className="font-display font-bold text-2xl text-navy">{value}</span>
                <span className="text-grey-dark text-sm mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-grey-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Featured Courses</h2>
            <p className="section-subheading">
              Explore our most popular programs designed for real-world success
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="academy-card p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-grey-dark mx-auto mb-4" />
              <p className="text-grey-dark text-lg">No courses available yet. Check back soon!</p>
              <Link to="/admin" className="mt-4 inline-block text-sky-accent hover:underline text-sm">
                Add courses via Admin Dashboard →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <div key={course.id.toString()} className="academy-card flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display font-semibold text-lg text-navy leading-snug flex-1">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-grey-dark text-sm leading-relaxed mb-4 line-clamp-3">
                      {course.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-grey-dark">⏱ {course.batchTimings}</span>
                      <span className="font-semibold text-navy">₹{Number(course.fees).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex gap-3">
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
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sky-accent font-semibold hover:underline"
            >
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why Choose SkillUp Academy?</h2>
            <p className="section-subheading">We're committed to your career success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Industry-Aligned Curriculum', desc: 'Courses designed with input from top employers to ensure you learn exactly what the job market demands.' },
              { icon: '👨‍🏫', title: 'Expert Trainers', desc: 'Learn from seasoned professionals with 10+ years of industry experience and a passion for teaching.' },
              { icon: '💻', title: 'Live Online Classes', desc: 'Attend interactive Zoom sessions from anywhere. Recordings available for flexible learning.' },
              { icon: '📜', title: 'Recognized Certification', desc: 'Earn certificates that are recognized by leading companies across India and globally.' },
              { icon: '🤝', title: 'Placement Assistance', desc: 'Dedicated placement cell with 50+ hiring partners to help you land your first or next job.' },
              { icon: '💰', title: 'Affordable Fees', desc: 'Quality education at competitive prices with flexible payment options and EMI facilities.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-grey-dark text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-grey-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">What Our Students Say</h2>
            <p className="section-subheading">Real stories from real career changers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="academy-card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-grey-dark text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-grey-dark text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of students who have already upgraded their skills and landed better jobs.
          </p>
          <Link
            to="/courses"
            className="bg-sky-accent text-white font-semibold px-10 py-4 rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-base"
          >
            Start Learning Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
