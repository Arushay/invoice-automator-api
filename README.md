# 🧾 Invoice Automator API

A production-ready backend API for automating invoice processing, built with TypeScript, Express, and PostgreSQL. 

This project demonstrates a real-world workflow: receiving a document, extracting data (mocked AI), saving it to a cloud database, and preparing it for synchronization with an external accounting system (like Exact Online).

## 🚀 Tech Stack
- **Language:** TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (hosted on Neon)
- **File Uploads:** Multer
- **Frontend:** Vanilla HTML & JavaScript (served statically by Express)

## ⚙️ How it Works
1. **Upload:** The user uploads an invoice (image/PDF) via the web dashboard.
2. **Extract:** The backend receives the file and uses an AI service (currently mocked) to extract key data (Supplier, Amount, VAT, Date).
3. **Store:** The extracted data is securely saved into a PostgreSQL database using parameterized SQL queries.
4. **Sync:** The user can click "Sync to Exact" on the dashboard, which updates the invoice status in the database (mocking the Exact Online API integration).

## 📡 API Endpoints

### Public Routes
- `GET /ping` - Health check to verify the server is running.
- `GET /db-test` - Verifies the database connection.

### Invoice Routes
- `POST /api/upload-invoice` - Upload an invoice file (multipart/form-data). Extracts data and saves to DB.
- `GET /api/invoices` - Retrieve a list of all processed invoices.
- `POST /api/invoices/:id/sync` - Mock endpoint to sync a specific invoice to Exact Online.

## 🏃‍♂️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Arushay/invoice-automator-api.git
   cd invoice-automator-api
   Install dependencies:

bash
npm install
Set up Environment Variables:
Create a .env file in the root directory and add your PostgreSQL connection string:

env
PORT=4000
DATABASE_URL=your_postgresql_connection_string
Run the development server:

bash
npm run dev
Open in browser:
Navigate to http://localhost:4000 to view the invoice dashboard.
👩‍💻 Author

Arushay
GitHub Profile