# nimmiw.com Website

This repository contains the source code for nimmiw.com personal website.

## Deployment

The website is automatically deployed using GitHub Actions whenever changes are pushed to the main branch.

### Setting up GitHub Secrets

To enable automatic deployment, you need to set up the following secrets in your GitHub repository:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `FTP_SERVER`: Your FTP server hostname
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password

### Manual Deployment

You can also trigger the deployment manually:

1. Go to the "Actions" tab in your repository
2. Select the "Deploy Static Website nimmiw.com" workflow
3. Click "Run workflow"

## Local Development

To run the website locally, simply open the `index.html` file in your web browser.

## Structure

```
.
├── assets/
│   ├── css/
│   ├── img/
│   ├── js/
│   └── vendor/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── index.html
```

## License

All rights reserved. This code may not be used commercially without explicit permission. 