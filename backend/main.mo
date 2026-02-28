import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type CourseId = Nat;
  type EnrollmentId = Nat;

  type Course = {
    id : CourseId;
    title : Text;
    shortDescription : Text;
    fullDescription : Text;
    syllabus : [Text];
    trainerName : Text;
    trainerBio : Text;
    batchTimings : Text;
    fees : Nat;
    zoomLink : Text;
  };

  type Enrollment = {
    id : EnrollmentId;
    studentName : Text;
    email : Text;
    phoneNumber : Text;
    courseId : CourseId;
    paymentStatus : PaymentStatus;
    timestamp : Int;
  };

  type PaymentStatus = {
    #pending;
    #paid;
  };

  module Enrollment {
    public func compareByTimestamp(e1 : Enrollment, e2 : Enrollment) : Order.Order {
      Int.compare(e1.timestamp, e2.timestamp);
    };
  };

  let courses = Map.empty<CourseId, Course>();
  let enrollments = Map.empty<EnrollmentId, Enrollment>();

  var nextCourseId : CourseId = 1;
  var nextEnrollmentId : EnrollmentId = 1;

  // Course CRUD
  public shared ({ caller }) func createCourse(
    title : Text,
    shortDescription : Text,
    fullDescription : Text,
    syllabus : [Text],
    trainerName : Text,
    trainerBio : Text,
    batchTimings : Text,
    fees : Nat,
    zoomLink : Text,
  ) : async CourseId {
    let courseId = nextCourseId;
    nextCourseId += 1;

    let course : Course = {
      id = courseId;
      title;
      shortDescription;
      fullDescription;
      syllabus;
      trainerName;
      trainerBio;
      batchTimings;
      fees;
      zoomLink;
    };

    courses.add(courseId, course);
    courseId;
  };

  public query ({ caller }) func getCourse(courseId : CourseId) : async ?Course {
    courses.get(courseId);
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray();
  };

  public shared ({ caller }) func updateCourse(
    courseId : CourseId,
    title : Text,
    shortDescription : Text,
    fullDescription : Text,
    syllabus : [Text],
    trainerName : Text,
    trainerBio : Text,
    batchTimings : Text,
    fees : Nat,
    zoomLink : Text,
  ) : async () {
    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {
        let updatedCourse : Course = {
          id = courseId;
          title;
          shortDescription;
          fullDescription;
          syllabus;
          trainerName;
          trainerBio;
          batchTimings;
          fees;
          zoomLink;
        };
        courses.add(courseId, updatedCourse);
      };
    };
  };

  public shared ({ caller }) func deleteCourse(courseId : CourseId) : async () {
    if (not courses.containsKey(courseId)) {
      Runtime.trap("Course not found");
    };
    courses.remove(courseId);
  };

  // Enrollment Management
  public shared ({ caller }) func createEnrollment(
    studentName : Text,
    email : Text,
    phoneNumber : Text,
    courseId : CourseId,
  ) : async EnrollmentId {
    if (not courses.containsKey(courseId)) {
      Runtime.trap("Course not found");
    };

    let enrollmentId = nextEnrollmentId;
    nextEnrollmentId += 1;

    let enrollment : Enrollment = {
      id = enrollmentId;
      studentName;
      email;
      phoneNumber;
      courseId;
      paymentStatus = #pending;
      timestamp = Time.now();
    };

    enrollments.add(enrollmentId, enrollment);
    enrollmentId;
  };

  public query ({ caller }) func getEnrollment(enrollmentId : EnrollmentId) : async ?Enrollment {
    enrollments.get(enrollmentId);
  };

  public query ({ caller }) func getAllEnrollments() : async [Enrollment] {
    enrollments.values().toArray().sort(Enrollment.compareByTimestamp);
  };

  public shared ({ caller }) func markEnrollmentPaid(enrollmentId : EnrollmentId) : async () {
    switch (enrollments.get(enrollmentId)) {
      case (null) { Runtime.trap("Enrollment not found") };
      case (?enrollment) {
        let updatedEnrollment : Enrollment = {
          id = enrollment.id;
          studentName = enrollment.studentName;
          email = enrollment.email;
          phoneNumber = enrollment.phoneNumber;
          courseId = enrollment.courseId;
          paymentStatus = #paid;
          timestamp = enrollment.timestamp;
        };
        enrollments.add(enrollmentId, updatedEnrollment);
      };
    };
  };

  public query ({ caller }) func getEnrollmentsByCourse(courseId : CourseId) : async [Enrollment] {
    enrollments.values().toArray().filter(
      func(e) {
        e.courseId == courseId;
      }
    ).sort(Enrollment.compareByTimestamp);
  };

  public query ({ caller }) func getEnrollmentsByStatus(status : PaymentStatus) : async [Enrollment] {
    enrollments.values().toArray().filter(
      func(e) {
        e.paymentStatus == status;
      }
    ).sort(Enrollment.compareByTimestamp);
  };
};
