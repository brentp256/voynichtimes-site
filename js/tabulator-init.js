// =============================================
// TABULATOR TABLES WITH CLICKABLE AMAZON "URL" LINKS
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - Amazon links enabled");

  // ==================== CHANGE THESE TWO LINES ====================
  const productsCSV = "YOUR_PRODUCTS_CSV_URL_HERE";   // ← We will replace this after Cloudflare deployment
  const productNameColumn = "Product";                // ← CHANGE THIS to your exact column header
  // Examples: "Product Name" or "Item" or "Name" or "Product Title"
  // ================================================================

  const data = await loadCSV(productsCSV);

  // ==================== FULL DATABASE PAGE ====================
  if (document.getElementById('product-table')) {
    new Tabulator("#product-table", {
      data: data,
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      columns: [
        {
          title: "Product",
          field: productNameColumn,
          formatter: "link",
          formatterParams: {
            labelField: productNameColumn,
            urlField: "URL",
            target: "_blank"
          },
          widthGrow: 3
        },
        // Add any other columns you want here (copy the pattern)
        // {title: "Release Date", field: "Release Date", sorter: "date"},
        // {title: "Price", field: "Price"},
        // {title: "Category", field: "Category"},
      ],
      initialSort: [{column: productNameColumn, dir: "asc"}]
    });
  }

  // ==================== RECENT & UPCOMING PAGE ====================
  if (document.getElementById('releases-table')) {
    new Tabulator("#releases-table", {
      data: data,
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      columns: [
        {
          title: "Product",
          field: productNameColumn,
          formatter: "link",
          formatterParams: {
            labelField: productNameColumn,
            urlField: "URL",
            target: "_blank"
          },
          widthGrow: 3
        },
        // Add other columns here too if you want
      ],
      initialSort: [{column: "Release Date", dir: "desc"}]   // newest first — change "Release Date" to your exact date column if different
    });
  }
});
