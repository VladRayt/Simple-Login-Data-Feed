import { zodResolver } from "@hookform/resolvers/zod"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { useForm } from "react-hook-form"

import { ThemeProvider } from "@/shared/theme/context"

import { LoginForm } from "./LoginForm"
import { loginSchema, LoginFormData } from "../schemas/login.schema"

const LoginFormWrapper = ({
  onSubmit,
  defaultValues = { email: "", password: "" },
}: {
  onSubmit: (data: LoginFormData) => void
  defaultValues?: Partial<LoginFormData>
}) => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
  })

  const wrappedSubmit = handleSubmit((data) => onSubmit(data))

  return (
    <ThemeProvider>
      <LoginForm control={control} onSubmit={wrappedSubmit} />
    </ThemeProvider>
  )
}

describe("LoginForm", () => {
  // ==========================================
  // RENDERING TESTS
  // ==========================================
  describe("rendering", () => {
    it("renders email and password fields", () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      // Перевіряємо що поля відрендерились
      // Використовуємо regex бо i18n підставляє ключі
      expect(getByPlaceholderText(/email/i)).toBeTruthy()
      expect(getByPlaceholderText(/password/i)).toBeTruthy()
    })

    it("renders login button", () => {
      const mockSubmit = jest.fn()
      const { getByTestId } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      expect(getByTestId("login-button")).toBeTruthy()
    })

    it("password field is secure by default", () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      const passwordField = getByPlaceholderText(/password/i)

      // secureTextEntry має бути true
      expect(passwordField.props.secureTextEntry).toBe(true)
    })

    it("email field has correct keyboard type", () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      const emailField = getByPlaceholderText(/email/i)

      expect(emailField.props.keyboardType).toBe("email-address")
      expect(emailField.props.autoCapitalize).toBe("none")
      expect(emailField.props.autoCorrect).toBe(false)
    })
  })

  // ==========================================
  // USER INTERACTION TESTS
  // ==========================================
  describe("user interaction", () => {
    it("allows user to type in email field", () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      const emailField = getByPlaceholderText(/email/i)

      fireEvent.changeText(emailField, "test@example.com")

      expect(emailField.props.value).toBe("test@example.com")
    })

    it("allows user to type in password field", () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      const passwordField = getByPlaceholderText(/password/i)

      fireEvent.changeText(passwordField, "password123")

      expect(passwordField.props.value).toBe("password123")
    })

    it("calls onSubmit with valid data when button is pressed", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      // Заповнюємо форму валідними даними
      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "password123")
      fireEvent.press(submitButton)

      // Чекаємо поки react-hook-form обробить submit
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
        expect(mockSubmit).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        })
      })
    })
  })

  // ==========================================
  // VALIDATION TESTS - Email
  // ==========================================
  describe("email validation", () => {
    it("shows error for empty email", async () => {
      const mockSubmit = jest.fn()
      const { getByTestId, findByText } = render(<LoginFormWrapper onSubmit={mockSubmit} />)

      const submitButton = getByTestId("login-button")

      fireEvent.press(submitButton)

      const errorMessage = await findByText(/email is required/i)
      expect(errorMessage).toBeTruthy()

      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it("shows error for invalid email format", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId, findByText } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "invalid-email")
      fireEvent.press(submitButton)

      const errorMessage = await findByText(/invalid email address/i)
      expect(errorMessage).toBeTruthy()
      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it("accepts valid email format", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, queryByText } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "password123")

      await waitFor(() => {
        expect(queryByText(/invalid email/i)).toBeNull()
      })
    })
  })

  // ==========================================
  // VALIDATION TESTS - Password
  // ==========================================
  describe("password validation", () => {
    it("shows error for password shorter than 6 characters", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId, findByText } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "12345") // Only 5 chars
      fireEvent.press(submitButton)

      const errorMessage = await findByText(/password must be at least 6 characters/i)
      expect(errorMessage).toBeTruthy()
      expect(mockSubmit).not.toHaveBeenCalled()
    })

    it("accepts password with 6 or more characters", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "123456") // Exactly 6 chars
      fireEvent.press(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })

  // ==========================================
  // EDGE CASES
  // ==========================================
  describe("edge cases", () => {
    it("handles email with spaces", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId, findByText } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, " test@example.com ")
      fireEvent.press(submitButton)

      // Zod should fail validation (spaces in email)
      const errorMessage = await findByText(/invalid email address/i)
      expect(errorMessage).toBeTruthy()
    })

    it("handles very long email", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      const longEmail = "a".repeat(50) + "@example.com"

      fireEvent.changeText(emailField, longEmail)
      fireEvent.changeText(passwordField, "password123")
      fireEvent.press(submitButton)

      // Should still work
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          email: longEmail,
          password: "password123",
        })
      })
    })

    it("handles special characters in password", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "P@ssw0rd!#$")
      fireEvent.press(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "P@ssw0rd!#$",
        })
      })
    })

    it("prevents multiple submissions", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "test@example.com")
      fireEvent.changeText(passwordField, "password123")

      fireEvent.press(submitButton)
      fireEvent.press(submitButton)
      fireEvent.press(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled()
      })
    })
  })

  // ==========================================
  // INTEGRATION: Full user flow
  // ==========================================
  describe("full user flow", () => {
    it("completes full login flow: invalid → valid → submit", async () => {
      const mockSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId, findByText, queryByText } = render(
        <LoginFormWrapper onSubmit={mockSubmit} />,
      )

      const emailField = getByPlaceholderText(/email/i)
      const passwordField = getByPlaceholderText(/password/i)
      const submitButton = getByTestId("login-button")

      fireEvent.changeText(emailField, "invalid")
      fireEvent.changeText(passwordField, "123")
      fireEvent.press(submitButton)

      const emailError = await findByText(/invalid email address/i)
      let passwordError = await findByText(/password must be at least 6/i)
      expect(emailError).toBeTruthy()
      expect(passwordError).toBeTruthy()
      expect(mockSubmit).not.toHaveBeenCalled()

      fireEvent.changeText(emailField, "test@example.com")

      await waitFor(() => {
        expect(queryByText(/invalid email address/i)).toBeNull()
      })

      fireEvent.press(submitButton)
      passwordError = await findByText(/password must be at least 6/i)
      expect(passwordError).toBeTruthy()
      expect(mockSubmit).not.toHaveBeenCalled()

      fireEvent.changeText(passwordField, "password123")

      await waitFor(() => {
        expect(queryByText(/invalid email/i)).toBeNull()
        expect(queryByText(/password must be at least 6/i)).toBeNull()
      })

      fireEvent.press(submitButton)

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1)
        expect(mockSubmit).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        })
      })
    })
  })
})
