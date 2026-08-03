// ============================================================
//  Women's Glow Beauty Services — Google Apps Script
//  Paste this entire file into your Apps Script editor,
//  then deploy as a Web App (see instructions below).
// ============================================================

var SHEET_NAME = "Bookings"; // Name of the tab inside your Google Sheet

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Ignore spam / honeypot submissions
    if (data.website && data.website.length > 0) {
      return jsonResponse({ status: "ignored" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create the sheet with headers on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(getHeaders());
      formatHeaderRow(sheet);
    }

    // If headers are missing (empty sheet), add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(getHeaders());
      formatHeaderRow(sheet);
    }

    // Append the booking row
    sheet.appendRow([
      data.bookingId       || "",
      formatTimestamp(data.timestamp),
      data.name            || "",
      data.phone           || "",
      data.whatsapp        || "",
      data.gender          || "",
      data.address         || "",
      data.landmark        || "",
      data.area            || "",
      data.pincode         || "",
      data.preferredDate   || "",
      data.preferredTime   || "",
      data.services        || "",
      data.servicesDetailed || "",
      data.servicesSubtotal || 0,
      data.disposableKitFee || 0,
      data.transportFee    || 0,
      data.totalAmount     || 0,
      data.paymentMode     || "",
      data.specialInstructions || "",
      data.source          || "website",
      "New"                    // Status column — update manually in sheet
    ]);

    return jsonResponse({ status: "ok", bookingId: data.bookingId });

  } catch (err) {
    Logger.log("Error: " + err.toString());
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

// ── Helpers ──────────────────────────────────────────────────

function getHeaders() {
  return [
    "Booking ID",
    "Timestamp",
    "Customer Name",
    "Phone",
    "WhatsApp",
    "Gender",
    "Address",
    "Landmark",
    "Area",
    "Pincode",
    "Appointment Date",
    "Appointment Time",
    "Services",
    "Services Details",
    "Services Subtotal (₹)",
    "Disposable Kit Fee (₹)",
    "Transport Fee (₹)",
    "Total (₹)",
    "Payment Mode",
    "Special Instructions",
    "Source",
    "Status"
  ];
}

function formatHeaderRow(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, getHeaders().length);
  headerRange.setBackground("#C89B6D");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160);  // Booking ID
  sheet.setColumnWidth(2, 160);  // Timestamp
  sheet.setColumnWidth(3, 140);  // Name
  sheet.setColumnWidth(13, 280); // Services
  sheet.setColumnWidth(14, 360); // Services Details (JSON / long text)
  sheet.setColumnWidth(15, 130); // Services Subtotal
  sheet.setColumnWidth(16, 140); // Disposable Kit Fee
  sheet.setColumnWidth(17, 120); // Transport Fee
  sheet.setColumnWidth(18, 120); // Total
  sheet.setColumnWidth(19, 120); // Payment Mode
  sheet.setColumnWidth(20, 200); // Instructions
  sheet.setColumnWidth(21, 100); // Source
  sheet.setColumnWidth(22, 100); // Status
}

function formatTimestamp(isoString) {
  if (!isoString) return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  var d = new Date(isoString);
  return Utilities.formatDate(d, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
