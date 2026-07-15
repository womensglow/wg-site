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
  sheet.setColumnWidth(14, 130); // Services Subtotal
  sheet.setColumnWidth(15, 140); // Disposable Kit Fee
  sheet.setColumnWidth(16, 120); // Transport Fee
  sheet.setColumnWidth(17, 120); // Total
  sheet.setColumnWidth(18, 120); // Payment Mode
  sheet.setColumnWidth(19, 200); // Instructions
  sheet.setColumnWidth(20, 100); // Source
  sheet.setColumnWidth(21, 100); // Status
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

// ── Test function — run manually from the editor to check ────
function testInsert() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        bookingId: "WG-TEST-0001",
        timestamp: new Date().toISOString(),
        name: "Test Customer",
        phone: "9876543210",
        whatsapp: "9876543210",
        gender: "Female",
        address: "123 Test Street",
        landmark: "Near Clock Tower",
        area: "Civil Lines",
        pincode: "282001",
        preferredDate: "2026-07-10",
        preferredTime: "11:00 AM – 12:00 PM",
        services: "Eyebrow Threading (Qty: 1), Full Arms Wax Rica (Qty: 1)",
        totalAmount: 360,
        paymentMode: "UPI",
        specialInstructions: "Please bring rose wax",
        website: ""
      })
    }
  };
  doPost(fakeEvent);
  Logger.log("Test row inserted — check your sheet!");
}
