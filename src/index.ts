import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer'; // <-- Import multer
import { pool } from './database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// app.use(express.json());
app.use(express.static('public')); // Serves the HTML file

// 1. SETUP MULTER (Stores file in memory temporarily)
const upload = multer({ storage: multer.memoryStorage() });

// 2. FAKE AI FUNCTION (Pretends to read the invoice)
const fakeAIReader = () => {
  return {
    supplierName: "Albert Heijn B.V.",
    amount: 45.50,
    vatAmount: 9.55,
    invoiceDate: "2023-11-01",
    invoiceNumber: "AH-99281"
  };
};

// 3. THE UPLOAD ENDPOINT 
app.post('/api/upload-invoice', upload.single('invoice'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    console.log(`📄 Received file: ${req.file.originalname}`);

    const invoiceData = fakeAIReader();
    console.log(`🤖 AI Extracted:`, invoiceData);

    const result = await pool.query(
      `INSERT INTO invoices 
       (supplier_name, amount, vat_amount, invoice_date, invoice_number) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        invoiceData.supplierName,
        invoiceData.amount,
        invoiceData.vatAmount,
        invoiceData.invoiceDate,
        invoiceData.invoiceNumber
      ]
    );

    console.log(`✅ Saved to database with ID: ${result.rows[0].id}`);

    res.status(201).json({
      message: 'Invoice processed successfully!',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error processing invoice:', error);
    res.status(500).json({ error: 'Failed to process invoice' });
  }
});

// --- Your other routes ---
app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'Invoice Automator API is running! 🚀' });
});

app.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected successfully!', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});