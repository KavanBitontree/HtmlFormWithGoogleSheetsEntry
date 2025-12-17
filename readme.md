# HTML Form with Google Sheets Entry

This is a comprehensive web application that demonstrates form handling, validation, and storage using Google Sheets as a backend database through Google Apps Script. The project includes user registration, login functionality, and a feedback form, with proper validation and error handling.

## Project Overview

The application consists of multiple interconnected pages that work together to provide a complete user experience:
- **Home Page (`index.html`)**: Main landing page with navigation menu
- **Registration Page (`register.html`)**: User sign-up with validation
- **Login Page (`login.html`)**: User authentication
- **Feedback Form (`feedback_form.html`)**: Allows authenticated users to submit feedback

## Features

### Frontend Components

#### CSS Styling (`@css/**`)
- **`global.css`**: Sets global background image and full-height layout
- **`index.css`**: Styles for the home page welcome container
- **`login.css`**: Login form styling with responsive design
- **`register.css`**: Registration form styling with show/hide password toggle
- **`feedback.css`**: Feedback form with star rating system
- **`navbar.css`**: Responsive navigation bar with hamburger menu
- **`error.css`**: Validation error styling and visual feedback

#### JavaScript Components (`@js/**`)
- Client-side form validation and submission
- State management using localStorage
- Responsive UI updates and loaders

#### Images (`@images/**`)
- **`bg_image.jpg`**: Background image used across all pages

## Technical Implementation

### HTML Structure
All pages follow a consistent structure with:
- Fixed navigation bar at the top
- Responsive containers with centered content
- Form validation with inline error messages
- Loading indicators during form submissions

### Backend Integration
The application uses Google Apps Script as a backend to store form data in Google Sheets. This provides a simple way to collect and store form submissions without requiring a traditional database server.

### Async/Await Demonstration (`@async.js`)
Contains sample code demonstrating asynchronous JavaScript programming:
```javascript
console.log("Start");

fetch_data("/api/users")
  .then(users => console.log(users))
  .catch(error => console.error("Error fetching users:", error));

console.log("End");

function fetch_data(url){
    return new Promise((resolve,resject)=>{
        setTimeout(() => {
            resolve({data: "Sample Data from " + url});
        }, 2000);
    })
}
```

### Race Condition Testing (`@test_race_condition.py`)
A Python script that simulates concurrent user requests to test race conditions:

```python
import requests
from concurrent.futures import ThreadPoolExecutor
from random import randint

WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyUhh-_McPLu6q601QitIgrP22Uk0ZIne1imfHjEy5mMAFn4H5b26xKuKs7T6JMgG8/exec"

def send_request(user_id):
    payload = {
        "type": "register",
        "name": f"User{user_id}",
        "email": f"user{user_id}@example.com",
        "password": f"Pass#{randint(1000,9999)}"
    }
    try:
        print(f"[User {user_id}] Sending request...")
        response = requests.post(WEB_APP_URL, json=payload)
        print(f"[User {user_id}] Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        print(f"[User {user_id}] Request failed:", e)

# Simulate 10 users sending data concurrently
with ThreadPoolExecutor(max_workers=10) as executor:
    for i in range(10):
        executor.submit(send_request, i)
```

This script tests the backend's ability to handle simultaneous requests by:
- Creating 10 concurrent threads
- Each thread sends a unique registration request
- Demonstrates potential race conditions when multiple users try to register simultaneously

## Google Apps Script Backend (`apps_script_code_placeholder`)

```
// [PLACEHOLDER FOR GOOGLE APPS SCRIPT CODE]
// The backend Google Apps Script code that handles:
// 1. Form submissions (registration, login, feedback)
// 2. Data validation and sanitization
// 3. Storage in Google Sheets
// 4. Race condition prevention using locks
//
// Key features of the Apps Script:
// - doGet() and doPost() handlers
// - Data processing functions for different form types
// - LockService for preventing race conditions
// - Proper error handling and response formatting
// - Sheet organization for different data types
```

The backend implementation uses Google Apps Script to:
- Process incoming form submissions
- Validate and sanitize data
- Store data in designated Google Sheets
- Handle user authentication
- Prevent race conditions using Google Apps Script's Lock Service

## Race Condition Prevention

One of the key challenges in web applications that store data in shared resources is preventing race conditions. When multiple users submit data simultaneously, there's potential for data corruption or inconsistencies.

The Google Apps Script implementation addresses this by using:
- **Lock Service**: Prevents multiple simultaneous writes to the sheet
- **Proper error handling**: Ensures data integrity even when concurrent operations fail
- **Atomic operations**: Completes write operations before allowing new ones

The `test_race_condition.py` script demonstrates this by simulating multiple concurrent requests to test the robustness of the locking mechanism.

## Setup Instructions

1. Deploy the Google Apps Script backend
2. Update the `CONFIG.SHEETS_API_URL` variable in the frontend code
3. Ensure CORS settings allow requests from your domain/IP
4. Test with the race condition simulation script

## Responsive Design

The application is fully responsive and includes:
- Mobile-friendly navigation with hamburger menu
- Adaptive form layouts
- Consistent styling across all devices
- Touch-friendly controls and buttons

## Validation Features

- Real-time form validation
- Visual error indicators
- Password strength requirements
- Email format validation
- Required field enforcement
- Feedback form rating system

## Security Considerations

- Client-side input validation
- Secure password handling (on the client side)
- Session management using localStorage
- Protection against basic form tampering
- Race condition prevention on the server side

## Potential Improvements

- Server-side validation for enhanced security
- Password encryption
- User role management
- Enhanced error logging
- More comprehensive testing suite
- Additional authentication methods