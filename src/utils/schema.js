import validator from "password-validator";

const schema = new validator();
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(16) // Maximum length 16
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols() // Must have symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Password", "Password123"]); // Blacklist these values

export default schema;
