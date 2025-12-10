import { useFormik } from "formik"
import * as Yup from "yup"

import { Button, ErrorMessage, Link } from "@/components/atoms"
import { FormField } from "@/components/molecules"

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void
  isLoading: boolean
  error: string | null
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit,
  })

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-card p-8 shadow-lg md:p-12">
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
        Login Page
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
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
          autoComplete="current-password"
        />

        {error && <ErrorMessage message={error} className="text-center" />}

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
}

export default LoginForm
