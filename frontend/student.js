const host = 'http://localhost:3000/api/v1/';

// Fetch courses from the backend and populate the table

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

// Populate the table with course data
function populateCoursesTable(courses) {
    const tableBody = document.getElementById('available-courses');
    tableBody.innerHTML = ''; // Clear existing courses

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
            <td><button onclick="applyCourse('${course.id}')">Apply</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Apply for a course
async function applyCourse(courseId) {
    try {
        const response = await fetch(`${host}enrollment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId }),
            credentials: 'include' // Include credentials
        });

        if (!response.ok) {
            throw new Error('Failed to apply for the course');
        }

        const result = await response.json();
        alert(`Successfully applied for course: ${result.courseTitle}`);
    } catch (error) {
        console.error('Error applying for course:', error);
        alert('Failed to apply for the course. Please try again later.');
    }
}

// Load the courses when the page is ready
document.addEventListener('DOMContentLoaded', fetchCourses);
