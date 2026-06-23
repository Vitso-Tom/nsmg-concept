// NSMG Google Sheets CMS -- Apps Script Backend
// Paste this into Extensions > Apps Script in your NSMG Google Sheet
// Then Deploy > New Deployment > Web App > Anyone can access

// GET requests -- returns approved events as JSON
function doGet(e) {
  var action = e.parameter.action || 'getEvents';
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === 'getEvents') {
    var sheet = ss.getSheetByName('Events');
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var events = [];

    for (var i = 1; i < data.length; i++) {
      var row = {};
      for (var j = 0; j < headers.length; j++) {
        row[headers[j]] = data[i][j];
      }
      // Only return approved events
      if (row.status && row.status.toString().toLowerCase() === 'approved') {
        events.push(row);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, events: events }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// POST requests -- handles form submissions
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data;

  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var action = data.action || '';
  var timestamp = new Date().toISOString();

  // ---- Join the Guild ----
  if (action === 'joinGuild') {
    var sheet = ss.getSheetByName('Members');
    sheet.appendRow([
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.type || '',
      data.interest || '',
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Welcome to the Guild!' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ---- Submit an Event ----
  if (action === 'submitEvent') {
    var sheet = ss.getSheetByName('Events');
    sheet.appendRow([
      'pending',
      data.eventName || '',
      data.bandArtist || '',
      data.venue || '',
      data.address || '',
      data.date || '',
      data.time || '',
      data.description || '',
      '',
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Event submitted for review!' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}
