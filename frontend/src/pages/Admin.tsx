import { useState } from 'react';
import {
  Plus, Edit2, Trash2, CheckCircle, Clock, Users,
  BookOpen, AlertCircle, Loader2, X, ChevronDown, ChevronUp
} from 'lucide-react';
import type { Course, Enrollment } from '../backend';
import { PaymentStatus } from '../backend';
import {
  useGetAllCourses,
  useDeleteCourse,
  useGetAllEnrollments,
  useMarkEnrollmentPaid,
} from '../hooks/useQueries';
import CourseForm from '../components/CourseForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FormMode = 'none' | 'add' | 'edit';

export default function Admin() {
  const { data: courses, isLoading: coursesLoading } = useGetAllCourses();
  const { data: enrollments, isLoading: enrollmentsLoading } = useGetAllEnrollments();
  const deleteCourse = useDeleteCourse();
  const markPaid = useMarkEnrollmentPaid();

  const [formMode, setFormMode] = useState<FormMode>('none');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const courseMap = new Map((courses ?? []).map((c) => [c.id.toString(), c.title]));

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSuccess = () => {
    setFormMode('none');
    setEditingCourse(null);
  };

  const handleFormCancel = () => {
    setFormMode('none');
    setEditingCourse(null);
  };

  const stats = {
    totalCourses: courses?.length ?? 0,
    totalEnrollments: enrollments?.length ?? 0,
    pendingPayments: enrollments?.filter((e) => e.paymentStatus === PaymentStatus.pending).length ?? 0,
    paidEnrollments: enrollments?.filter((e) => e.paymentStatus === PaymentStatus.paid).length ?? 0,
  };

  return (
    <div className="bg-grey-light min-h-screen">
      {/* Header */}
      <div className="bg-navy py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-1">
            Admin Dashboard
          </h1>
          <p className="text-white/60 text-sm">Manage courses and enrollments</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Total Courses', value: stats.totalCourses, color: 'text-sky-accent' },
            { icon: Users, label: 'Total Enrollments', value: stats.totalEnrollments, color: 'text-sky-accent' },
            { icon: Clock, label: 'Pending Payments', value: stats.pendingPayments, color: 'text-amber-500' },
            { icon: CheckCircle, label: 'Paid Enrollments', value: stats.paidEnrollments, color: 'text-green-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="academy-card p-5">
              <Icon className={`w-6 h-6 ${color} mb-2`} />
              <p className="font-display font-bold text-2xl text-navy">{value}</p>
              <p className="text-grey-dark text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Course Form */}
        {formMode !== 'none' && (
          <div className="academy-card p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-xl text-navy">
                {formMode === 'add' ? 'Add New Course' : `Edit: ${editingCourse?.title}`}
              </h2>
              <button onClick={handleFormCancel} className="text-grey-dark hover:text-navy transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <CourseForm
              course={formMode === 'edit' ? editingCourse : null}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        <Tabs defaultValue="courses">
          <TabsList className="mb-6 bg-white border border-grey-mid">
            <TabsTrigger value="courses" className="data-[state=active]:bg-navy data-[state=active]:text-white">
              Courses ({stats.totalCourses})
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="data-[state=active]:bg-navy data-[state=active]:text-white">
              Enrollments ({stats.totalEnrollments})
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="academy-card overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-grey-mid">
                <h2 className="font-display font-semibold text-navy">All Courses</h2>
                {formMode === 'none' && (
                  <Button
                    onClick={() => setFormMode('add')}
                    className="bg-navy hover:bg-navy-dark text-white"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Course
                  </Button>
                )}
              </div>

              {coursesLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-5 flex-1" />
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  ))}
                </div>
              ) : !courses || courses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-grey-dark mx-auto mb-3" />
                  <p className="text-grey-dark mb-4">No courses yet. Add your first course!</p>
                  <Button onClick={() => setFormMode('add')} className="bg-navy hover:bg-navy-dark text-white">
                    <Plus className="w-4 h-4 mr-1" /> Add Course
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-grey-mid">
                  {courses.map((course) => {
                    const isExpanded = expandedCourse === course.id.toString();
                    return (
                      <div key={course.id.toString()}>
                        <div className="px-6 py-4 flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-navy truncate">{course.title}</h3>
                            <p className="text-grey-dark text-xs mt-0.5">
                              ₹{Number(course.fees).toLocaleString('en-IN')} · {course.batchTimings}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => setExpandedCourse(isExpanded ? null : course.id.toString())}
                              className="text-grey-dark hover:text-navy transition-colors p-1"
                              aria-label="Toggle details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(course)}
                              className="border-navy text-navy hover:bg-navy hover:text-white"
                            >
                              <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{course.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteCourse.mutate(course.id)}
                                    className="bg-destructive hover:bg-destructive/90 text-white"
                                  >
                                    {deleteCourse.isPending ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : 'Delete'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-6 pb-4 bg-grey-light/50 border-t border-grey-mid">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-sm">
                              <div>
                                <p className="text-xs text-grey-dark uppercase tracking-wide mb-1">Trainer</p>
                                <p className="text-navy">{course.trainerName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-grey-dark uppercase tracking-wide mb-1">Zoom Link</p>
                                <p className="text-sky-accent truncate">{course.zoomLink || 'Not set'}</p>
                              </div>
                              {course.syllabus.length > 0 && (
                                <div className="md:col-span-2">
                                  <p className="text-xs text-grey-dark uppercase tracking-wide mb-1">Syllabus</p>
                                  <ul className="list-disc list-inside space-y-0.5">
                                    {course.syllabus.map((t, i) => (
                                      <li key={i} className="text-navy">{t}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments">
            <div className="academy-card overflow-hidden">
              <div className="px-6 py-4 border-b border-grey-mid">
                <h2 className="font-display font-semibold text-navy">All Enrollments</h2>
              </div>

              {enrollmentsLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : !enrollments || enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-grey-dark mx-auto mb-3" />
                  <p className="text-grey-dark">No enrollments yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-grey-light/50">
                        <TableHead className="text-navy font-semibold">Student</TableHead>
                        <TableHead className="text-navy font-semibold">Email</TableHead>
                        <TableHead className="text-navy font-semibold hidden md:table-cell">Phone</TableHead>
                        <TableHead className="text-navy font-semibold">Course</TableHead>
                        <TableHead className="text-navy font-semibold">Status</TableHead>
                        <TableHead className="text-navy font-semibold">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.map((enrollment: Enrollment) => (
                        <TableRow key={enrollment.id.toString()} className="hover:bg-grey-light/30">
                          <TableCell className="font-medium text-navy">
                            {enrollment.studentName}
                          </TableCell>
                          <TableCell className="text-grey-dark text-sm">
                            {enrollment.email}
                          </TableCell>
                          <TableCell className="text-grey-dark text-sm hidden md:table-cell">
                            {enrollment.phoneNumber}
                          </TableCell>
                          <TableCell className="text-grey-dark text-sm">
                            {courseMap.get(enrollment.courseId.toString()) ?? `Course #${enrollment.courseId}`}
                          </TableCell>
                          <TableCell>
                            {enrollment.paymentStatus === PaymentStatus.paid ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" /> Paid
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                                <Clock className="w-3 h-3 mr-1" /> Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {enrollment.paymentStatus === PaymentStatus.pending && (
                              <Button
                                size="sm"
                                onClick={() => markPaid.mutate(enrollment.id)}
                                disabled={markPaid.isPending}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs"
                              >
                                {markPaid.isPending ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3 mr-1" /> Mark Paid
                                  </>
                                )}
                              </Button>
                            )}
                            {enrollment.paymentStatus === PaymentStatus.paid && (
                              <span className="text-grey-dark text-xs">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
