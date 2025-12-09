# Channel Welding - WaaS Template

Live site: https://channel-welding.netlify.app/

This is a complete, responsive, single-page React website designed for local service businesses (Landscaping, Plumbing, HVAC, etc.). It is set up for deployment on Netlify with built-in form handling.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Locally:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🛠 Customization Guide (For Future Clients)

To adapt this template for a new client, primarily edit `src/App.jsx`.

### 1. Update Business Details
Look for the `businessDetails` object at the top of `src/App.jsx`. Change these values to match your new client:

```javascript
const businessDetails = {
  name: "New Client Name",
  tagline: "Their Catchy Tagline",
  phone: "(555) 123-4567",
  cleanPhone: "+15551234567", // Important for click-to-call
  email: "client@email.com",
  address: "123 Main St, City, State",
  // ... colors, images, etc.
};
```

### 2. Update Images
*   **Hero Image:** Change `businessDetails.heroImage`.
*   **About Image:** Search for the `<img>` tag in the `#about` section.
*   **Map:** Update the `iframe` src in the `#contact-info` section with the new Google Maps embed link.

### 3. Update Services
Modify the `services` array in `businessDetails` to change the icons, titles, and descriptions.

## 🌐 Netlify Deployment & Forms

1.  **Push to GitHub.**
2.  **Connect to Netlify:** Create a new site from Git.
3.  **Forms:**
    *   The form is pre-configured with `data-netlify="true"`.
    *   Go to **Netlify Dashboard > Site Settings > Forms > Notifications** to set up email alerts for your client.
    *   **Important:** The `index.html` contains a hidden form helper to ensure Netlify bots detect the form fields correctly. If you add fields to `App.jsx`, add them to `index.html` as well.

## 📱 Features
*   **Responsive:** Works on Mobile, Tablet, Desktop.
*   **SEO Ready:** Meta tags configured in `index.html`.
*   **Contact Form:** Validates emails/phones and sends via Netlify.
*   **Click-to-Call:** Optimized for mobile conversions.
*   **Smooth Scroll:** Better user experience for navigation.

## 📝 License
Template created by JS Web Services.
