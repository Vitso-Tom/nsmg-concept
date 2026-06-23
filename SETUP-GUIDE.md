# NSMG Google Sheets CMS -- Setup Guide

This turns a Google Sheet into a lightweight CMS for the North Shore Musicians Guild site.
John manages events and members in a spreadsheet. The website reads from it automatically.

---

## Step 1: Create the Google Sheet

1. Go to https://sheets.google.com and create a new spreadsheet
2. Name it: **NSMG Site Data**

### Tab 1: "Events" (rename Sheet1)

Add these exact headers in Row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| status | eventName | bandArtist | venue | address | date | time | description | imageUrl | submittedAt |

Add John's current events as rows with status = **approved**:

Row 2:
```
approved | Open Mic Night | Various Artists | Hugh O'Neill's | 45 Pleasant St., Malden | Every Wednesday | 8:30 PM | A talented network of local singer/songwriters and musicians performing short sets. Hosted by Jeff Munro. Sign-ups begin at 8:00 PM. | https://images.squarespace-cdn.com/content/v1/69e4f1aaecad617269ed70e4/1782071298911-BN52U4SQKVCSPBYFMBT2/unsplash-image-2UuhMZEChdc.jpg?format=750w |
```

Row 3:
```
approved | Fred Ellsworth | Fred Ellsworth | Berry Tavern | 2 High St., Danvers | Every Tuesday | 7:00 PM | A weekly staple at The Berry Tavern, adding to the already inviting atmosphere of regulars and friendly staff. Great menu with exceptional pizza. Reservations are a safe bet. | https://images.squarespace-cdn.com/content/v1/69e4f1aaecad617269ed70e4/503b0b66-a219-48ab-9fc5-4fea96a4e99f/fred.webp?format=750w |
```

Row 4:
```
approved | Bare Bones at The Deck | Bare Bones | The Deck | 179 Bridge St., Salisbury | Fri Jun 26 | 6:00 PM | Another great night of high energy rock to keep you moving, whether you're burning off dinner from the restaurant downstairs or stopping in for a drink with an amazing view. | https://images.squarespace-cdn.com/content/v1/69e4f1aaecad617269ed70e4/62dfc18d-198e-4498-bd6e-3b6b8d2c7901/OIP.webp?format=750w |
```

Row 5:
```
approved | Ordinary Madness at Berry Tavern | Ordinary Madness | Berry Tavern | 2 High St., Danvers | Wed Jul 23 | TBA | Covers spanning five decades. Progressive rock gems and danceable rock and roll classics from the 70s through the 00s. | https://images.squarespace-cdn.com/content/v1/69e4f1aaecad617269ed70e4/8733ba9b-b33c-4da5-a5f0-d3bb8e14121b/deck+pic.jpeg?format=750w |
```

### Tab 2: "Members" (add a new sheet tab)

Add these exact headers in Row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| firstName | lastName | email | type | interest | submittedAt |


### Tab 3: "EventSubmissions" (add a new sheet tab)

Add these exact headers in Row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| status | eventName | bandArtist | venue | address | date | time | description | submitterEmail | submittedAt |

New event submissions land here with status = **pending**.
John reviews, edits if needed, copies approved rows to the Events tab with status = **approved**.

---

## Step 2: Deploy the Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in Code.gs
3. Paste the entire contents of **apps-script.gs** (provided separately)
4. Click **Deploy > New deployment**
5. Type = **Web app**
6. Execute as = **Me**
7. Who has access = **Anyone**
8. Click **Deploy**
9. Copy the Web App URL -- it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

**IMPORTANT:** Every time you edit the script, you need to create a NEW deployment
(Deploy > New deployment) for changes to take effect. "Deploy > Manage deployments"
only updates existing ones.

---

## Step 3: Update the Website

1. Open **index.html** and **events.html**
2. Find the line: `const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';`
3. Replace with your actual Apps Script Web App URL from Step 2
4. Commit and push to GitHub

---

## How It Works

### For John (day to day):
- Open the Google Sheet
- Add a row to the Events tab with status = "approved" -- it appears on the site
- Check the Members tab to see who signed up
- Check EventSubmissions for community-submitted events, review, copy approved ones to Events tab

### For site visitors:
- Events page loads fresh from the sheet every time
- "Join the Guild" form submits directly to the Members sheet
- "Submit an Event" form submits to EventSubmissions with status = "pending"

### Architecture:
```
Google Sheet (data) <--> Apps Script (API) <--> GitHub Pages (frontend)
```

Same pattern as: Database <--> API Server <--> Static Frontend
But built on tools a non-technical person can manage.
