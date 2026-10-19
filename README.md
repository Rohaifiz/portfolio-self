# Mohamad Rohaifiz — Professional Portfolio

A responsive portfolio covering data analytics, business intelligence, SQL, ETL, programming and web development.

## Website content

- Power BI reporting, Laravel development and Oracle-to-PostgreSQL migration case studies.
- Technical skills and detailed professional experience.
- Interactive food-delivery sentiment analysis results.
- Academic projects, education, achievements, certification and languages.
- Separate Google Drive résumé links for Johor and Kuala Lumpur/Selangor.
- Email and phone contact links.

## Open the website

Open `index.html` in a browser. Styling, JavaScript and the favicon are included in that file, so the page works without fetching separate assets. The same file works at a domain root or in a GitHub Pages project subdirectory.

## Publish with GitHub Pages

This project is stored in `Rohaifiz/portfolio-self`, using the `main` branch.

1. Make the repository public if required by the account's Pages plan.
2. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main**, choose **/ (root)**, and select **Save**.
4. Wait for GitHub's Pages deployment to finish, then open the published URL shown in Settings.

The expected project URL after successful publication is `https://rohaifiz.github.io/portfolio-self/`. This is an expected URL until Pages is enabled and deployment succeeds. Later changes to `main` are published through GitHub's branch-based Pages deployment.

GitHub's publishing-source guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Edit the website

- Edit content in `index.html`.
- Edit styling in `src/styles.css`.
- Edit interactions and case-study text in `src/app.js`.
- Edit the icon in `src/favicon.svg`.
- After changing these source assets, run `node scripts/embed-assets.mjs` to update `index.html`.

Run the embedding script before committing changed asset files, so GitHub Pages serves the updated standalone index.html. No package installation, API key or backend is needed for this static project.

Dashboard illustrations use sample data. Sentiment accuracy values are the historical two-class experiment results supplied for the final-year project.
