# WaaS Template Customization Guide

This guide explains how to replicate and customize the base React template (e.g., `Phils-Gardening`) for new clients.

## 1. Clone the Template
Copy the existing template folder to a new folder with your client's name.

**PowerShell:**
```powershell
Copy-Item -Path "Phils-Gardening" -Destination "New-Client-Name" -Recurse
```

## 2. Project Setup
Open the new folder in VS Code and update the project metadata.

### `package.json`
Update the `name` field to match the new project (use lowercase, no spaces).
```json
{
  "name": "new-client-name",
  ...
}
```

### `index.html`
Update the `<title>` and `<meta name="description">` tags for SEO.
```html
<title>New Client Name | City, State</title>
<meta name="description" content="Description of services..." />
```
*Important:* Ensure the hidden Netlify form in `index.html` has the correct `name` attribute if you change it (default is "contact").

## 3. Business Configuration (`src/App.jsx`)
Most customizations happen in `src/App.jsx`. Look for the `businessDetails` object at the top of the component.

```javascript
const businessDetails = {
  name: "New Client Name",
  phone: "(555) 123-4567",
  cleanPhone: "5551234567", // For tel: links
  email: "contact@newclient.com",
  address: "123 Main St, City, State",
  hours: "Mon-Fri: 8am - 6pm",
  primaryColor: "#1e40af", // Main brand color (e.g., Blue)
  accentColor: "#eff6ff",  // Light background color
  services: [
    { title: "Service 1", desc: "..." },
    { title: "Service 2", desc: "..." },
    // ...
  ]
};
```

## 4. Theming & Styling
The template uses **Tailwind CSS**.

### Theme Variations

#### Standard Theme (Service-Based)
*Used in: Phils-Gardening, Haulin-Handyman*
- **Layout**: Clean, white/light background, rounded corners.
- **Best for**: Residential services (Gardening, Plumbing, Handyman).
- **Key Colors**: 
  - `primaryColor`: Brand color (Green, Blue).
  - `accentColor`: Very light shade of brand color.

#### Industrial Theme (Dark Mode)
*Used in: Channel-Welding*
- **Layout**: Dark background (`bg-gray-900`), sharp corners (`rounded-none`), uppercase typography.
- **Best for**: Industrial, Construction, Manufacturing, Nightlife.
- **Key Changes**:
  - **Backgrounds**: Switch `bg-white` to `bg-gray-900` or `bg-gray-800`.
  - **Text**: Switch `text-gray-800` to `text-gray-100`.
  - **Typography**: Add `uppercase`, `tracking-wide` classes.
  - **Icons**: Use "harder" icons like `Flame`, `Factory`, `ShieldCheck`.
  - **Accents**: Use high-contrast colors like Safety Orange (`#f97316`) or Neon Yellow.

### Colors
1.  **Primary Color**: Updated in `businessDetails.primaryColor`. This handles buttons and major accents.
2.  **Secondary Colors**: You may need to find and replace Tailwind color classes in the code.
    *   *Example:* If moving from Green to Blue:
        *   Search for `text-green-` and replace with `text-blue-`.
        *   Search for `bg-green-` and replace with `bg-blue-`.
        *   Search for `border-green-` and replace with `border-blue-`.

### Icons
The template uses `lucide-react`.
1.  Import new icons at the top:
    ```javascript
    import { Hammer, Wrench, Truck } from 'lucide-react';
    ```
2.  Replace icon components in the JSX where appropriate (e.g., in the Services section).

## 5. Images
1.  Place new images in the `public/` folder or `src/assets/`.
2.  Update image references in `App.jsx`.
    *   *Hero Background*: Look for the `backgroundImage` style in the Hero section.
    *   *About Section*: Update the `img src` tag.

## 6. Deployment (Netlify)
1.  **Build Command**: `npm run build`
2.  **Publish Directory**: `dist`
3.  **Forms**: Netlify automatically detects the `data-netlify="true"` attribute in the form.
    *   *Troubleshooting*: If forms don't work, ensure the hidden HTML form in `index.html` exists and matches the input names in `App.jsx`.

## 7. Checklist Before Launch
- [ ] `package.json` name updated
- [ ] `index.html` title & meta description updated
- [ ] `businessDetails` updated (Phone, Email, Address)
- [ ] Services list customized
- [ ] Color theme consistent (check hover states and borders)
- [ ] Contact Form tests (check Netlify submission)
- [ ] Mobile responsiveness check
