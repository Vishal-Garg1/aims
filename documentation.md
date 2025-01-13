Authentication API Documentation

Base URL
/auth

Endpoints
1. Send OTP
URL: /auth/send-otp

Method: POST

Description: Sends an OTP to the user's email address.

Request Body:

json
{
  "email": "user@example.com"
}
Responses:

200 OK:

json
{
  "message": "OTP sent successfully",
  "role": "student/faculty/admin"
}
404 Not Found:

json
{
  "message": "User not found"
}
500 Internal Server Error:

json
{
  "message": "Error message"
}
2. Verify OTP
URL: /auth/verify-otp

Method: POST

Description: Verifies the OTP and logs in the user by setting a JWT token as a cookie.

Request Body:

json
{
  "email": "user@example.com",
  "otp": "123456"
}
Responses:

200 OK:

json
{
  "message": "Logged in successfully",
  "role": "student/faculty/admin"
}
400 Bad Request:

json
{
  "message": "Invalid OTP/OTP has expired"
}
500 Internal Server Error:

json
{
  "message": "Error message"
}
3. Logout
URL: /auth/logout

Method: POST

Description: Logs out the user by clearing the JWT token cookie.

Middleware: authenticate

Responses:

200 OK:

json
{ "message": "Logged out successfully" }


# Student API Documentation

## Base URL
`/students`

## Endpoints

### 1. Create a New Student
- **URL:** `/students/`
- **Method:** POST
- **Description:** Creates a new student.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 21,
    "major": "Computer Science"
  }
Responses:

201 Created:

json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "major": "Computer Science"
}
400 Bad Request:

json
{
  "error": "Error message"
}
2. Get All Students
URL: /students/

Method: GET

Description: Retrieves all students.

Responses:

200 OK:

json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 21,
    "major": "Computer Science"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 22,
    "major": "Mathematics"
  }
]
400 Bad Request:

json
{
  "error": "Error message"
}
3. Get a Single Student by ID
URL: /students/{id}

Method: GET

Description: Retrieves a single student by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the student.

Responses:

200 OK:

json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "major": "Computer Science"
}
404 Not Found:

json
{
  "error": "Student not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
4. Update a Student by ID
URL: /students/{id}

Method: PUT

Description: Updates a student's information by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the student.

Request Body:

json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "major": "Computer Science"
}
Responses:

200 OK:

json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 21,
  "major": "Computer Science"
}
404 Not Found:

json
{
  "error": "Student not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
5. Delete a Student by ID
URL: /students/{id}

Method: DELETE

Description: Deletes a student by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the student.

Responses:

204 No Content: No response body.

404 Not Found:

json
{
  "error": "Student not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}




# Faculty API Documentation

## Base URL
`/faculty`

## Endpoints

### 1. Create a New Faculty Member
- **URL:** `/faculty/`
- **Method:** POST
- **Description:** Creates a new faculty member.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "department": "Computer Science",
    "position": "Professor"
  }
Responses:

201 Created:

json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "department": "Computer Science",
  "position": "Professor"
}
400 Bad Request:

json
{
  "error": "Error message"
}
2. Get All Faculty Members
URL: /faculty/

Method: GET

Description: Retrieves all faculty members.

Responses:

200 OK:

json
[
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "department": "Computer Science",
    "position": "Professor"
  },
  {
    "id": 2,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "department": "Mathematics",
    "position": "Associate Professor"
  }
]
400 Bad Request:

json
{
  "error": "Error message"
}
3. Get a Single Faculty Member by ID
URL: /faculty/{id}

Method: GET

Description: Retrieves a single faculty member by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the faculty member.

Responses:

200 OK:

json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "department": "Computer Science",
  "position": "Professor"
}
404 Not Found:

json
{
  "error": "Faculty member not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
4. Update a Faculty Member by ID
URL: /faculty/{id}

Method: PUT

Description: Updates a faculty member's information by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the faculty member.

Request Body:

json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "department": "Computer Science",
  "position": "Professor"
}
Responses:

200 OK:

json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "department": "Computer Science",
  "position": "Professor"
}
404 Not Found:

json
{
  "error": "Faculty member not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
5. Delete a Faculty Member by ID
URL: /faculty/{id}

Method: DELETE

Description: Deletes a faculty member by their ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the faculty member.

Responses:

204 No Content: No response body.

404 Not Found:

json
{
  "error": "Faculty member not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}

# Course API Documentation

## Base URL
`/courses`

## Endpoints

### 1. Create a New Course
- **URL:** `/courses/`
- **Method:** POST
- **Description:** Creates a new course.
- **Request Body:**
  ```json
  {
    "name": "Introduction to Programming",
    "description": "A beginner's course on programming",
    "credits": 3
  }
Responses:

201 Created:

json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "A beginner's course on programming",
  "credits": 3
}
400 Bad Request:

json
{
  "error": "Error message"
}
2. Get All Courses
URL: /courses/

Method: GET

Description: Retrieves all courses.

Responses:

200 OK:

json
[
  {
    "id": 1,
    "name": "Introduction to Programming",
    "description": "A beginner's course on programming",
    "credits": 3
  },
  {
    "id": 2,
    "name": "Advanced Mathematics",
    "description": "An advanced course on mathematics",
    "credits": 4
  }
]
400 Bad Request:

json
{
  "error": "Error message"
}
3. Get a Single Course by ID
URL: /courses/{id}

Method: GET

Description: Retrieves a single course by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the course.

Responses:

200 OK:

json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "A beginner's course on programming",
  "credits": 3
}
404 Not Found:

json
{
  "message": "Course not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
4. Update a Course by ID
URL: /courses/{id}

Method: PUT

Description: Updates a course's information by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the course.

Request Body:

json
{
  "name": "Introduction to Programming",
  "description": "A beginner's course on programming",
  "credits": 3
}
Responses:

200 OK:

json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "A beginner's course on programming",
  "credits": 3
}
404 Not Found:

json
{
  "message": "Course not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
5. Delete a Course by ID
URL: /courses/{id}

Method: DELETE

Description: Deletes a course by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the course.

Responses:

204 No Content: No response body.

404 Not Found:

json
{
  "message": "Course not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}

# Enrollment API Documentation

## Base URL
`/enrollment`

## Endpoints

### 1. Create a New Enrollment
- **URL:** `/enrollment/`
- **Method:** POST
- **Description:** Creates a new enrollment (student requests enrollment).
- **Request Body:**
  ```json
  {
    "studentID": 1,
    "courseId": 1,
    "status": "Pending Instructor Approval"
  }
Responses:

201 Created:

json
{
  "id": 1,
  "studentID": 1,
  "courseId": 1,
  "status": "Pending Instructor Approval"
}
400 Bad Request:

json
{
  "error": "Error message"
}
2. Instructor Approves the Enrollment
URL: /enrollment/{id}/instructor-approve

Method: PATCH

Description: Instructor approves the enrollment.

Parameters:

Path Parameter:

id (integer, required): The ID of the enrollment.

Responses:

200 OK:

json
{
  "id": 1,
  "studentID": 1,
  "courseId": 1,
  "status": "Pending Advisor Approval"
}
404 Not Found:

json
{
  "error": "Enrollment not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
3. Advisor Approves the Enrollment
URL: /enrollment/{id}/advisor-approve

Method: PATCH

Description: Advisor approves the enrollment.

Parameters:

Path Parameter:

id (integer, required): The ID of the enrollment.

Responses:

200 OK:

json
{
  "id": 1,
  "studentID": 1,
  "courseId": 1,
  "status": "Enrolled"
}
404 Not Found:

json
{
  "error": "Enrollment not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
4. Get All Enrollments
URL: /enrollment/

Method: GET

Description: Retrieves all enrollments.

Responses:

200 OK:

json
[
  {
    "id": 1,
    "studentID": 1,
    "courseId": 1,
    "status": "Pending Instructor Approval"
  },
  {
    "id": 2,
    "studentID": 2,
    "courseId": 1,
    "status": "Enrolled"
  }
]
400 Bad Request:

json
{
  "error": "Error message"
}
5. Get a Single Enrollment by ID
URL: /enrollment/{id}

Method: GET

Description: Retrieves a single enrollment by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the enrollment.

Responses:

200 OK:

json
{
  "id": 1,
  "studentID": 1,
  "courseId": 1,
  "status": "Pending Instructor Approval"
}
404 Not Found:

json
{
  "error": "Enrollment not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
6. Get All Enrollments of a Specific Course
URL: /enrollment/course/{courseId}

Method: GET

Description: Retrieves all enrollments of a specific course.

Parameters:

Path Parameter:

courseId (integer, required): The ID of the course.

Responses:

200 OK:

json
[
  {
    "id": 1,
    "studentID": 1,
    "courseId": 1,
    "status": "Pending Instructor Approval"
  },
  {
    "id": 2,
    "studentID": 2,
    "courseId": 1,
    "status": "Enrolled"
  }
]
404 Not Found:

json
{
  "error": "No enrollments found for this course"
}
400 Bad Request:

json
{
  "error": "Error message"
}
7. Update an Enrollment by ID
URL: /enrollment/{id}

Method: PUT

Description: Updates an enrollment by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the enrollment.

Request Body:

json
{
  "status": "Pending Instructor Approval"
}
Responses:

200 OK:

json
{
  "id": 1,
  "studentID": 1,
  "courseId": 1,
  "status": "Pending Instructor Approval"
}
404 Not Found:

json
{
  "error": "Enrollment not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}
8. Delete an Enrollment by ID
URL: /enrollment/{id}

Method: DELETE

Description: Deletes an enrollment by its ID.

Parameters:

Path Parameter:

id (integer, required): The ID of the enrollment.

Responses:

204 No Content: No response body.

404 Not Found:

json
{
  "error": "Enrollment not found"
}
400 Bad Request:

json
{
  "error": "Error message"
}