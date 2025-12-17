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

