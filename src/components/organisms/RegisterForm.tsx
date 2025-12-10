import { useFormik } from "formik"
import * as Yup from "yup"

import { Button, ErrorMessage, Link } from "@/components/atoms"
import { FormField, SelectField } from "@/components/molecules"

interface RegisterFormProps {
  onSubmit: (values: {
    username: string
    email: string
    password: string
    role: string
  }) => void
  isLoading: boolean
  error: string | null
}

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "user"], "Please select a valid role")
    .required("Role is required"),
})

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
]

const RegisterForm = ({ onSubmit, isLoading, error }: RegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit,
  })

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-card p-8 shadow-lg md:p-12">
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
        Register User
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* User name */}
        <FormField
          id="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
          touched={formik.touched.username}
          autoComplete="username"
        />

        {/* Email */}
        <FormField
          id="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          autoComplete="email"
        />

        {/* Password */}
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          autoComplete="new-password"
        />

        {/* Role Options */}
        <SelectField
          id="role"
          label="Role"
          value={formik.values.role}
          options={roleOptions}
          onValueChange={(value) => formik.setFieldValue("role", value)}
          onBlur={() => formik.setFieldTouched("role", true)}
          error={formik.errors.role}
          touched={formik.touched.role}
          placeholder="Select a role"
        />

        {error && <ErrorMessage message={error} className="text-center" />}

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login">Back to Login Page</Link>
      </div>
    </div>
  )
}

export default RegisterForm
