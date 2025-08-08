# GitHub Repository Setup Guide

## Current Status
✅ **Download buttons are working** - They link to PDF files in the `project_assets/` folder
✅ **GitHub links updated** - Now point to specific repository URLs with proper GitHub icons

## GitHub Links Updated

The following GitHub links have been updated in your website:

1. **Screw Feeder Body**: `https://github.com/jasonnoortman/screw-feeder-body`
2. **Chain Conveyor Assembly**: `https://github.com/jasonnoortman/chain-conveyor-assembly`

## To Make These Links Work

### Option 1: Create the Repositories (Recommended)
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Create repositories with these names:
   - `screw-feeder-body`
   - `chain-conveyor-assembly`
4. Upload your project files (CAD drawings, documentation, etc.)
5. Add a README.md file describing each project

### Option 2: Update Links to Your Actual Repositories
If you already have GitHub repositories for these projects, update the links in `index.html`:

```html
<!-- Replace these URLs with your actual GitHub repository URLs -->
<a href="https://github.com/YOUR_USERNAME/YOUR_REPO_NAME" class="btn btn-outline-light btn-sm" target="_blank">
    <i class="fas fa-github"></i> View on GitHub
</a>
```

### Option 3: Remove GitHub Links Temporarily
If you don't want GitHub links yet, you can comment them out or remove them:

```html
<!-- Comment out or remove this section -->
<!--
<a href="https://github.com/jasonnoortman/screw-feeder-body" class="btn btn-outline-light btn-sm" target="_blank">
    <i class="fas fa-github"></i> View on GitHub
</a>
-->
```

## What's Working Now

✅ **Download buttons** - These work perfectly and will download the PDF files
✅ **GitHub icons** - Changed from generic "eye" icon to proper GitHub icon
✅ **Proper styling** - Buttons maintain consistent styling

## Next Steps

1. **Create GitHub repositories** for your projects
2. **Upload project files** to each repository
3. **Add project documentation** (README files, technical specifications)
4. **Test the links** to ensure they work correctly

## Repository Structure Suggestion

For each project repository, consider including:
- `README.md` - Project description and technical details
- `CAD/` - CAD files (Inventor, AutoCAD)
- `PDF/` - Technical drawings and documentation
- `Images/` - Renders and screenshots
- `Specifications/` - Technical specifications and requirements

This will make your GitHub repositories professional and informative for potential clients or employers.
