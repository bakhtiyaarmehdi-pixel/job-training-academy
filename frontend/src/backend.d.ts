import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type EnrollmentId = bigint;
export interface Enrollment {
    id: EnrollmentId;
    paymentStatus: PaymentStatus;
    studentName: string;
    email: string;
    timestamp: bigint;
    phoneNumber: string;
    courseId: CourseId;
}
export type CourseId = bigint;
export interface Course {
    id: CourseId;
    title: string;
    trainerBio: string;
    fees: bigint;
    trainerName: string;
    shortDescription: string;
    batchTimings: string;
    zoomLink: string;
    fullDescription: string;
    syllabus: Array<string>;
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid"
}
export interface backendInterface {
    createCourse(title: string, shortDescription: string, fullDescription: string, syllabus: Array<string>, trainerName: string, trainerBio: string, batchTimings: string, fees: bigint, zoomLink: string): Promise<CourseId>;
    createEnrollment(studentName: string, email: string, phoneNumber: string, courseId: CourseId): Promise<EnrollmentId>;
    deleteCourse(courseId: CourseId): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllEnrollments(): Promise<Array<Enrollment>>;
    getCourse(courseId: CourseId): Promise<Course | null>;
    getEnrollment(enrollmentId: EnrollmentId): Promise<Enrollment | null>;
    getEnrollmentsByCourse(courseId: CourseId): Promise<Array<Enrollment>>;
    getEnrollmentsByStatus(status: PaymentStatus): Promise<Array<Enrollment>>;
    markEnrollmentPaid(enrollmentId: EnrollmentId): Promise<void>;
    updateCourse(courseId: CourseId, title: string, shortDescription: string, fullDescription: string, syllabus: Array<string>, trainerName: string, trainerBio: string, batchTimings: string, fees: bigint, zoomLink: string): Promise<void>;
}
