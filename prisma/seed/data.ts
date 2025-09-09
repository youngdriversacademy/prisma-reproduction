import { DriverGroup, Role } from "@/app/generated/prisma/enums";
import { subYears } from "date-fns";

export const adminAndParentUsers = [
  {
    email: "jane.doe@example.com",
    firstName: "Jane",
    lastName: "Doe",
  },
  {
    email: "lucy.parent@example.com",
    firstName: "Lucy",
    lastName: "Parentson",
  },
  {
    email: "mike.supervisor@example.com",
    firstName: "Mike",
    lastName: "Supervisor",
    role: Role.ADMIN,
  },
  {
    email: "sara.parent@example.com",
    firstName: "Sara",
    lastName: "Parentella",
  },
  {
    email: "ella.manager@example.com",
    firstName: "Ella",
    lastName: "Manager",
    role: Role.ADMIN,
  },
].map((user) => ({
  ...user,
  role: user.role ?? Role.PARENT,
  password: user.role?.toLowerCase() ?? Role.PARENT.toLowerCase(), // Default placeholder
  emailVerified: true,
  adminApproved: true,
}));

export const driverUsers = [
  {
    email: "john.driver@example.com",
    firstName: "John",
    lastName: "Driver",
    parentEmail: "jane.doe@example.com",
    birthdate: subYears(new Date(), 10), // Minis
    driverGroup: DriverGroup.MINI,
  },
  {
    email: "leo.child@example.com",
    firstName: "Leo",
    lastName: "Childson",
    parentEmail: "lucy.parent@example.com",
    emailVerified: true,
    birthdate: subYears(new Date(), 13), // Junior
    driverGroup: DriverGroup.JUNIOR,
  },
  {
    email: "alice.worker@example.com",
    firstName: "Alice",
    lastName: "Worker",
    parentEmail: "mike.supervisor@example.com",
    adminApproved: true,
    birthdate: subYears(new Date(), 15), // Senior
    driverGroup: DriverGroup.SENIOR,
  },
  {
    email: "bobby.kid@example.com",
    firstName: "Bobby",
    lastName: "Kid",
    parentEmail: "sara.parent@example.com",
    adminApproved: true,
    birthdate: subYears(new Date(), 7), // Minis
    driverGroup: DriverGroup.MINI,
  },
  {
    email: "tommy.trainee@example.com",
    firstName: "Tommy",
    lastName: "Trainee",
    parentEmail: "ella.manager@example.com",
    birthdate: subYears(new Date(), 12), // Junior
    driverGroup: DriverGroup.JUNIOR,
  },
].map((user) => ({
  ...user,
  role: Role.DRIVER,
  password: Role.DRIVER.toLowerCase(), // Replace with hashed or dummy password
  emailVerified: user.emailVerified ?? false,
  adminApproved: user.adminApproved ?? false,
}));

// export const driverGroups = [
//   { id: 1, name: "mini", minAge: 6, maxAge: 11 },
//   { id: 2, name: "junior", minAge: 12, maxAge: 14 },
//   { id: 3, name: "senior", minAge: 15, maxAge: 99 },
// ] as const; // readonly
