# Notion CMS Setup Guide

This guide will help you set up Notion as a CMS for the Field Notes (blog) section of the ART Village Naggar website.

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Give it a name like "ART Village Website"
4. Select the workspace where you'll create articles
5. Click **Submit**
6. Copy the **"Internal Integration Secret"** (starts with `secret_`)

## Step 2: Create Your Articles Database

1. Create a new page in Notion
2. Add a **Database - Full page** (type `/database` and select "Database - Full page")
3. Name it "Field Notes" or "Blog Articles"

### Required Properties (columns)

Set up your database with these exact property names:

| Property Name | Type | Description |
|--------------|------|-------------|
| **Title** | Title | The article title (default column) |
| **Slug** | Text | URL-friendly version (e.g., "my-first-post") |
| **Excerpt** | Text | Short description (1-2 sentences) |
| **Category** | Select | Options: Architecture, Village Life, Food, Culture, etc. |
| **Date** | Date | Publication date |
| **ReadTime** | Text | Reading time (e.g., "5 min read") |
| **CoverImage** | Files & media | Upload or paste image URL |
| **Published** | Checkbox | Check to publish, uncheck to hide |

### Example Database Structure:

```
| Title                  | Slug              | Category     | Date       | Published |
|------------------------|-------------------|--------------|------------|-----------|
| What is Kathkuni?      | what-is-kathkuni  | Architecture | 2026-01-15 | ✓         |
| Four Seasons in...     | four-seasons      | Village Life | 2025-12-10 | ✓         |
| Food That Walked Here  | food-walked-here  | Food         | 2025-11-20 | ✓         |
```

## Step 3: Connect Your Database to the Integration

1. Open your database page in Notion
2. Click the **"..."** menu (top right)
3. Go to **"Connections"** → **"Connect to"**
4. Search for and select your integration ("ART Village Website")

## Step 4: Get Your Database ID

1. Open your database in Notion
2. Look at the URL: `https://www.notion.so/your-workspace/DATABASE_ID?v=...`
3. Copy the `DATABASE_ID` part (32 characters, no dashes in URL)

Example URL:
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6?v=...
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  This is your Database ID
```

## Step 5: Add Environment Variables

### For Local Development

Create a `.env` file in the project root:

```env
NOTION_API_KEY=secret_your_integration_secret_here
NOTION_DATABASE_ID=your_database_id_here
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `NOTION_API_KEY` = your integration secret
   - `NOTION_DATABASE_ID` = your database ID
4. Redeploy the project

## How to Write Articles

### Creating a New Article

1. Open your Notion database
2. Click **"+ New"** to add a row
3. Fill in all the fields:
   - **Title**: Your article headline
   - **Slug**: URL-friendly version (lowercase, hyphens instead of spaces)
   - **Excerpt**: 1-2 sentence summary
   - **Category**: Select or create a category
   - **Date**: Publication date
   - **ReadTime**: Estimated reading time
   - **CoverImage**: Upload or paste an image URL
   - **Published**: Check when ready to publish

### Publishing

- **To publish**: Check the "Published" checkbox
- **To unpublish**: Uncheck the "Published" checkbox
- Changes appear on the website within 5 minutes (cached)

### Tips for Good Articles

1. **Slug**: Use lowercase letters and hyphens only
   - Good: `what-is-kathkuni`
   - Bad: `What Is Kathkuni?`

2. **Excerpt**: Keep it compelling and under 200 characters

3. **Cover Images**:
   - Recommended size: 1200x800 pixels
   - Use high-quality, relevant images
   - You can upload directly or paste image URLs

4. **Categories**: Keep them consistent for better filtering
   - Suggested: Architecture, Village Life, Food, Culture, Experiences

## Troubleshooting

### Articles not showing up?

1. Check that "Published" is checked
2. Verify the database is connected to your integration
3. Wait 5 minutes for cache to refresh
4. Check that all required properties exist with exact names

### Images not loading?

1. For uploaded images: Notion URLs expire after 1 hour
2. **Recommended**: Use external image URLs (upload to Cloudinary, Imgur, etc.)
3. Or add images directly to the website's assets folder

### Need help?

Contact: hello@artvillagenaggar.com

---

## Quick Reference

| What | Where |
|------|-------|
| Create Integration | notion.so/my-integrations |
| Environment Variables (Vercel) | Vercel Dashboard → Settings → Environment Variables |
| Database Connection | Database → ... menu → Connections |

**Required Properties:**
- Title (title)
- Slug (text)
- Excerpt (text)
- Category (select)
- Date (date)
- ReadTime (text)
- CoverImage (files)
- Published (checkbox)
