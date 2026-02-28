import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Course, CourseId, Enrollment, EnrollmentId } from '../backend';
import { PaymentStatus } from '../backend';

// ─── Course Queries ───────────────────────────────────────────────────────────

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourse(courseId: CourseId | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Course | null>({
    queryKey: ['course', courseId?.toString()],
    queryFn: async () => {
      if (!actor || courseId === null) return null;
      return actor.getCourse(courseId);
    },
    enabled: !!actor && !isFetching && courseId !== null,
  });
}

export function useCreateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<CourseId, Error, {
    title: string;
    shortDescription: string;
    fullDescription: string;
    syllabus: string[];
    trainerName: string;
    trainerBio: string;
    batchTimings: string;
    fees: bigint;
    zoomLink: string;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createCourse(
        data.title,
        data.shortDescription,
        data.fullDescription,
        data.syllabus,
        data.trainerName,
        data.trainerBio,
        data.batchTimings,
        data.fees,
        data.zoomLink,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useUpdateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, {
    courseId: CourseId;
    title: string;
    shortDescription: string;
    fullDescription: string;
    syllabus: string[];
    trainerName: string;
    trainerBio: string;
    batchTimings: string;
    fees: bigint;
    zoomLink: string;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateCourse(
        data.courseId,
        data.title,
        data.shortDescription,
        data.fullDescription,
        data.syllabus,
        data.trainerName,
        data.trainerBio,
        data.batchTimings,
        data.fees,
        data.zoomLink,
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId.toString()] });
    },
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, CourseId>({
    mutationFn: async (courseId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

// ─── Enrollment Queries ───────────────────────────────────────────────────────

export function useGetAllEnrollments() {
  const { actor, isFetching } = useActor();

  return useQuery<Enrollment[]>({
    queryKey: ['enrollments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateEnrollment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<EnrollmentId, Error, {
    studentName: string;
    email: string;
    phoneNumber: string;
    courseId: CourseId;
  }>({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createEnrollment(
        data.studentName,
        data.email,
        data.phoneNumber,
        data.courseId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
}

export function useMarkEnrollmentPaid() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, EnrollmentId>({
    mutationFn: async (enrollmentId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markEnrollmentPaid(enrollmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
}

export { PaymentStatus };
