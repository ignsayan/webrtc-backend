/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user using multipart/form-data. Authorization token is required.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - phone
 *               - password
 *               - password_confirmation
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password
 *               password_confirmation:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the new password
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user using either email or username along with password.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             oneOf:
 *               - required: [email]
 *               - required: [username]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset link or code to the user's email.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address to receive the password reset instructions
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a valid reset token.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - email
 *               - password
 *               - password_confirmation
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password
 *               password_confirmation:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the new password
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout the current user
 *     description: Invalidates the user's authentication token and logs them out.
 *     tags:
 *       - Authentication
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/send-verification:
 *   post:
 *     summary: Send a verification OTP
 *     description: Sends a verification code (OTP) to the provided attribute (phone/email).
 *     tags:
 *       - Verification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - attribute
 *             properties:
 *               attribute:
 *                 type: string
 *                 description: Phone number or email to send the OTP
 *     responses:
 *       default:
 *         description: API response
 */

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify OTP code
 *     description: Verifies the OTP code sent via a specified channel (e.g., phone).
 *     tags:
 *       - Verification
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - channel
 *             properties:
 *               code:
 *                 type: string
 *                 description: OTP code to verify
 *               channel:
 *                 type: string
 *                 description: Channel through which OTP was sent (e.g., phone, email)
 *     responses:
 *       default:
 *         description: API response
 */
