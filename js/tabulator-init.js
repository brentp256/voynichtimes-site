// =============================================
// FULL TABLE WITH CLICKABLE AMAZON LINKS + ALL COLUMNS
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
        { title: "Company", field: "!Company" },
        { title: "Series", field: "Series" },
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
        { title: "Category", field: "Category" },
        { title: "Prd#", field: "Prd#" },
        { title: "Date", field: "Date" },
        { title: "Notes", field: "Notes" },
        { title: "URL", field: "URL", visible: false }   // hidden - we use it for links only
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
        { title: "Company", field: "!Company" },
        { title: "Series", field: "Series" },
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
        { title: "Category", field: "Category" },
        { title: "Prd#", field: "Prd#" },
        { title: "Date", field: "Date" },
        { title: "Notes", field: "Notes" },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]   // newest first
    });
  }
});
