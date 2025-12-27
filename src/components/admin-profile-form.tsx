"use client"

import { z } from "zod"

const adminFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Too long"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Too long"),

  phoneNum: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Too long")
    .optional(),

  gender: z
    .enum(["male", "female", "other"], {
      required_error: "Gender is required",
    })
    .optional(),

  uniEmail: z
    .string()
    .email("Invalid university email")
    .optional(),

  buildingName: z
    .string()
    .min(1, "Building name is required"),

  departmentName: z
    .string()
    .min(1, "Department name is required"),

  avatar: z
    .any()
    .optional(), 
})

export default adminFormSchema