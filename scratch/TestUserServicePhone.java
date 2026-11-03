import com.healthify.service.UserService;

public class TestUserServicePhone {
    public static void main(String[] args) {
        System.out.println("=== TESTING SPRING BOOT USER SERVICE PHONE VALIDATION ===");

        // Valid Indian numbers
        String[] validCases = {
            "9876543210",
            "+91 98765 43210",
            "09876543210",
            "+91-85558-58879",
            "  7123456789  ",
            "6987654321"
        };

        for (String test : validCases) {
            try {
                String clean = UserService.normalizeAndValidatePhone(test, true);
                System.out.println("✅ VALID: '" + test + "' -> '" + clean + "' (Length: " + clean.length() + ")");
                if (clean.length() != 10 || !clean.matches("^[6-9]\\d{9}$")) {
                    throw new RuntimeException("Validation failed for clean value: " + clean);
                }
            } catch (Exception e) {
                System.err.println("❌ FAILED for '" + test + "': " + e.getMessage());
                System.exit(1);
            }
        }

        // Invalid cases
        String[] invalidCases = {
            "1234567890", // Doesn't start with 6-9
            "987654321",  // 9 digits
            "98765432100", // 11 digits
            "98765abcde", // Alphabets
            "0000000000"  // Invalid starting digit
        };

        for (String test : invalidCases) {
            try {
                UserService.normalizeAndValidatePhone(test, true);
                System.err.println("❌ SHOULD HAVE FAILED for: '" + test + "'");
                System.exit(1);
            } catch (IllegalArgumentException e) {
                System.out.println("✅ REJECTED AS EXPECTED: '" + test + "' -> " + e.getMessage());
            }
        }

        System.out.println("\n🎉 ALL SPRING BOOT PHONE VALIDATION TESTS PASSED 100%!");
    }
}

