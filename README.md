✅ README.md
markdown
Copy
Edit
# 🧩 Bitespeed Backend Task – Identity Reconciliation

This project is a solution for the Bitespeed backend challenge to reconcile user identities based on email and phone number using Node.js and MySQL.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize ORM**
- **Dotenv**

---

## 🧠 Problem Statement

When a user is identified by an email or phone number (or both), we must determine whether this user already exists in our system—either directly or via secondary linked identities—and reconcile all matching identities to a single **primary contact**.

---

## 🗂️ Database Schema

**Table: `Contacts`**

| Field           | Type     | Description                             |
|----------------|----------|-----------------------------------------|
| `id`            | INTEGER  | Primary key                             |
| `phoneNumber`   | STRING   | User's phone number                     |
| `email`         | STRING   | User's email address                    |
| `linkedId`      | INTEGER  | ID of the primary contact (if secondary) |
| `linkPrecedence`| ENUM     | `'primary'` or `'secondary'`            |
| `createdAt`     | DATE     | Auto-managed by Sequelize               |
| `updatedAt`     | DATE     | Auto-managed by Sequelize               |
| `deletedAt`     | DATE     | For soft deletion (optional)           |

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Gangakhedkaraarya/bitespeed-task.git
cd bitespeed-task
2. Install dependencies
bash
Copy
Edit
npm install
3. Setup environment variables
Create a .env file in the root directory:

env
Copy
Edit
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
PORT=3000
4. Configure the database
Make sure your MySQL database is running and the schema exists.

If you want Sequelize to sync the table:

javascript
Copy
Edit
// Add this line in `db.js` after connecting
sequelize.sync({ alter: true });
Then run the server once to create the table.

5. Start the server
bash
Copy
Edit
npm start
The server will run on http://localhost:3000

🧪 API Usage
POST /identify
Request Body
json
Copy
Edit
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
You may send only email, only phone number, or both.

Response
json
Copy
Edit
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com", "another@example.com"],
    "phoneNumbers": ["1234567890", "9876543210"],
    "secondaryContactIds": [2, 3]
  }
}
🧹 Future Improvements
Add test cases using Jest or Postman collection.

Add Docker support for containerized setup.

Improve validation using express-validator or Joi.

📄 License
This project is licensed for evaluation purposes under Bitespeed's hiring challenge.

yaml
Copy
Edit

---

### 📌 Instructions to Add This to Your Project

1. In your project root folder:
```bash
nano README.md
Paste the content above.

Save with: Ctrl + O, Enter, then Ctrl + X.

Commit and push:

bash
Copy
Edit
git add README.md
git commit -m "Add README.md with project setup and API usage"
git push origin main
