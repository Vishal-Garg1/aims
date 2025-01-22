const host = 'http://localhost:3000/api/v1/';

// Fetch courses from the backend
async function fetchCourses() {
    try {
        const response = await fetch(`${host}courses/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include credentials
        });
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const courses = await response.json();
        populateCoursesTable(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Failed to load courses. Please try again later.');
    }
}

// Populate the course list in the table
function populateCoursesTable(courses) {
    const tableBody = document.getElementById('courses-list');
    tableBody.innerHTML = ''; // Clear existing rows

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.courseCode}</td>
            <td>${course.title}</td>
            <td>${course.academicSession}</td>
            <td>${course.instructorId}</td>
            <td>${course.offeringDepartment}</td>
            <td>${course.status}</td>
            <td>${course.credits}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Add a new course
async function addCourse() {
    const courseCode = document.getElementById('course-code').value;
    const courseTitle = document.getElementById('course-title').value;
    const academicSession = document.getElementById('academic-session').value;
    const instructorId = document.getElementById('instructor-id').value;
    const offeringDepartment = document.getElementById('offering-department').value;
    const status = document.getElementById('status').value;
    const credits = document.getElementById('credits').value;

    if (!courseCode || !courseTitle || !academicSession || !instructorId || !offeringDepartment || !status || !credits) {
        alert('Please fill in all fields.');
        return;
    }

    const newCourse = {
        courseCode,
        courseTitle,
        academicSession,
        instructorId,
        offeringDepartment,
        status,
        credits
    };

    try {
        const response = await fetch(`${host}courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
            credentials: 'include' // Include credentials
        });

        if (!response.ok) {
            throw new Error('Failed to add course');
        }

        alert('Course added successfully!');
        fetchCourses(); // Refresh course list
    } catch (error) {
        console.error('Error adding course:', error);
        alert('Failed to add course. Please try again later.');
    }
}

// Load courses when the page is ready
document.addEventListener('DOMContentLoaded', fetchCourses);
