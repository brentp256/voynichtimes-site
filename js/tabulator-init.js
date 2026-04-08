// =============================================
// TABULATOR TABLES WITH CLICKABLE AMAZON "URL" LINKS
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - Amazon links enabled");

  // ==================== YOUR REAL DATA ====================
  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";
  // =======================================================

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
      initialSort: [{column: "Date", dir: "desc"}]   // newest first using your "Date" column
    });
  }
});
