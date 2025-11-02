// src/shared/utils/formatDate.test.ts

import { formatDate, loadDateFnsLocale } from "./formatDate"

// Mock i18next to control locale in tests
jest.mock("i18next", () => ({
  language: "en-US", // default for tests
}))

describe("formatDate", () => {
  // Load locale before each test
  beforeEach(() => {
    loadDateFnsLocale()
  })

  describe("basic formatting", () => {
    it("formats ISO date with default format", () => {
      const isoDate = "2024-03-15T12:30:00.000Z"
      const result = formatDate(isoDate)

      // Default format: "MMM dd, yyyy"
      expect(result).toBe("Mar 15, 2024")
    })

    it("formats date with custom format", () => {
      const isoDate = "2024-03-15T12:30:00.000Z"
      const result = formatDate(isoDate, "yyyy-MM-dd")

      expect(result).toBe("2024-03-15")
    })

    it("formats date with time", () => {
      const isoDate = "2024-03-15T12:30:00.000Z"
      const result = formatDate(isoDate, "MMM dd, yyyy HH:mm")

      // Note: time may differ due to timezone
      expect(result).toMatch(/Mar 15, 2024 \d{2}:\d{2}/)
    })
  })

  describe("different input formats", () => {
    it("handles date without milliseconds", () => {
      const isoDate = "2024-03-15T12:30:00Z"
      const result = formatDate(isoDate)

      expect(result).toBe("Mar 15, 2024")
    })

    it("handles date without time", () => {
      const isoDate = "2024-03-15"
      const result = formatDate(isoDate)

      expect(result).toBe("Mar 15, 2024")
    })

    it("handles date at the beginning of year", () => {
      const isoDate = "2024-01-01T00:00:00.000Z"
      const result = formatDate(isoDate)

      expect(result).toBe("Jan 01, 2024")
    })

    it("handles date at the end of year", () => {
      // Use midday to avoid timezone shifting to next day
      const isoDate = "2024-12-31T12:00:00.000Z"
      const result = formatDate(isoDate)

      expect(result).toBe("Dec 31, 2024")
    })
  })

  describe("custom date-fns options", () => {
    it("uses custom options", () => {
      const isoDate = "2024-03-15T12:30:00.000Z"
      const result = formatDate(isoDate, "EEEE, MMMM do, yyyy", {
        useAdditionalWeekYearTokens: false,
      })

      expect(result).toBe("Friday, March 15th, 2024")
    })
  })

  describe("edge cases", () => {
    it("handles leap year", () => {
      const isoDate = "2024-02-29T12:00:00.000Z" // 2024 is a leap year
      const result = formatDate(isoDate)

      expect(result).toBe("Feb 29, 2024")
    })

    it("handles dates in distant past", () => {
      const isoDate = "1970-01-01T00:00:00.000Z"
      const result = formatDate(isoDate)

      expect(result).toBe("Jan 01, 1970")
    })

    it("handles dates in distant future", () => {
      // Use midday to avoid timezone issues
      const isoDate = "2099-12-31T12:00:00.000Z"
      const result = formatDate(isoDate)

      expect(result).toBe("Dec 31, 2099")
    })
  })

  describe("error handling", () => {
    it("throws error for invalid ISO date", () => {
      const invalidDate = "not-a-date"

      expect(() => formatDate(invalidDate)).toThrow()
    })

    it("throws error for empty string", () => {
      expect(() => formatDate("")).toThrow()
    })

    it("throws error for invalid format token", () => {
      const isoDate = "2024-03-15T12:30:00.000Z"
      expect(() => formatDate(isoDate, "XXXX-invalid")).toThrow()
    })
  })
})

describe("loadDateFnsLocale", () => {
  afterEach(() => {
    jest.resetModules()
  })

  describe("supported languages", () => {
    it("loads English locale", () => {
      jest.doMock("i18next", () => ({ language: "en-US" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads Arabic locale", () => {
      jest.doMock("i18next", () => ({ language: "ar" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads Korean locale", () => {
      jest.doMock("i18next", () => ({ language: "ko" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads Spanish locale", () => {
      jest.doMock("i18next", () => ({ language: "es" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads French locale", () => {
      jest.doMock("i18next", () => ({ language: "fr" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads Hindi locale", () => {
      jest.doMock("i18next", () => ({ language: "hi" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("loads Japanese locale", () => {
      jest.doMock("i18next", () => ({ language: "ja" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })
  })

  describe("fallback behavior", () => {
    it("uses English for unsupported language", () => {
      jest.doMock("i18next", () => ({ language: "uk-UA" }))

      expect(() => loadDateFnsLocale()).not.toThrow()
    })

    it("handles language with region (extracts primary tag)", () => {
      jest.doMock("i18next", () => ({ language: "es-ES" }))

      // Should extract "es" and load Spanish locale
      expect(() => loadDateFnsLocale()).not.toThrow()
    })
  })
})

// ==========================================
// INTEGRATION TEST - verify locale formatting
// Note: Testing actual locale output is tricky because
// loadDateFnsLocale() uses a module-level variable.
// These tests verify the function works, not exact output.
// ==========================================
describe("formatDate integration with locales", () => {
  it("formats date in English locale", () => {
    // This uses the default "en-US" mock from top of file
    const result = formatDate("2024-03-15T12:30:00.000Z", "MMMM")

    // Verify it's a valid month name
    expect(result).toMatch(/^[A-Z][a-z]+$/)
    expect(result).toBe("March")
  })

  it("formats dates consistently with same locale", () => {
    const date1 = formatDate("2024-03-15T12:00:00.000Z", "MMM dd, yyyy")
    const date2 = formatDate("2024-03-15T12:00:00.000Z", "MMM dd, yyyy")

    // Same date should produce same output
    expect(date1).toBe(date2)
  })

  it("handles different format strings", () => {
    const isoDate = "2024-03-15T12:30:00.000Z"

    const short = formatDate(isoDate, "MM/dd/yyyy")
    const long = formatDate(isoDate, "MMMM dd, yyyy")
    const custom = formatDate(isoDate, "yyyy-MM-dd")

    expect(short).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    expect(long).toMatch(/^[A-Z][a-z]+ \d{2}, \d{4}$/)
    expect(custom).toBe("2024-03-15")
  })
})
