# REST API Assignment (By Udayan Sharma)

The API classifies an input array of strings, returning detailed, customized output according to task specifications.

---

## API Endpoint

**POST** `/bfhl`

> Live Demo: [https://udayan-bajaj-assn-326c9c8bac72.herokuapp.com/bfhl](https://udayan-bajaj-assn-326c9c8bac72.herokuapp.com/bfhl)  

---

## Sample Request

```json
{
"data": ["a", "1", "334", "4", "R", "$"]
}
```

## Sample Response

```json
{
"is_success": true,
"user_id": "Udayan Sharma",
"email": "udayan922.be22@chitkara.edu.in",
"roll_number": "CIET1234",
"odd_numbers": ["1"],
"even_numbers": ["334", "4"],
"alphabets": ["A", "R"],
"special_characters": ["$"],
"sum": "339",
"concat_string": "Ra"
}
```

---

## How It Works

- **Validates** the input as an array.
- **Categorizes** entries into:  
    - Odd & even numbers  
    - Uppercase alphabets  
    - Special characters  
- **Sums** all numeric input.
- **Concatenates** all letters in reverse order, alternating letter cases.
- **Populates user info** from environment variables via `.env`.

---

## Tech Stack

- Node.js
- Express.js
- dotenv

---

## Local Setup

1. **Clone this repo**
        ```
        git clone https://github.com/your-username/bfhl-api.git
        cd bfhl-api
        ```

2. **Install dependencies**
        ```
        npm install
        ```

3. **Configure your identity via `.env`**

        Create a `.env` file in the root directory:
        ```
        FULL_NAME=Udayan Sharma
        DOB=19052004
        EMAIL=udayan922.be22@chitkara.edu.in
        ROLL_NUMBER=2210990922
        ```

4. **Run the API**
        ```
        node index.js
        ```

5. **Test using Postman or curl:**
        - **Endpoint:** `http://localhost:3000/bfhl`
        - **Method:** POST
        - **Headers:** `Content-Type: application/json`
        - **Body:**  
            ```
            {
                "data": [ "a", "1", "334", "4", "R", "$" ]
            }
            ```

---

## Project Structure

```
├── index.js 
├── package.json 
├── procfile
└── README.md 
```

## Author

- **Name:** Udayan Sharma
- **Email:** udayanmoudgil@gmail.com
- **College Email:** udayan922.be22@chitkara.edu.in
- **Roll No:** 2210990922

---
