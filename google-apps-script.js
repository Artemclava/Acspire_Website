/**
 * ACSPIRE Contact Form — Google Apps Script
 * ==========================================
 * SETUP STEPS:
 * 1. Create a new Google Sheet at https://sheets.google.com
 * 2. Click Extensions → Apps Script
 * 3. Delete everything and paste THIS entire code
 * 4. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy → Copy the Web App URL
 * 6. Paste that URL into your .env file as VITE_SHEETS_URL
 * ==========================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Company',
        'Service',
        'Budget',
        'Message',
        'Status'
      ]);
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground('#0F172A');
      headerRange.setFontColor('#D4AF37');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Parse incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Append form data as new row
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '-',
      data.company || '-',
      data.service || '-',
      data.budget || 'Not specified',
      data.message || '',
      '🆕 New'
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 10);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'ACSPIRE Form API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
