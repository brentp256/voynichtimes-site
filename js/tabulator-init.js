// =============================================
// CLEAN TABLE - NO PRD# ON FULL DATABASE + LIVE FILTERS
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - Amazon links + filters enabled");

  // ==================== YOUR REAL DATA ====================
  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";
  // =======================================================

  const data = await loadCSV(productsCSV);

  // ==================== FULL DATABASE PAGE (no Prd#, with filters) ====================
  if (document.getElementById('product-table')) {
    new Tabulator("#product-table", {
      data: data,
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      columns: [
        { title: "Company", field: "!Company", headerFilter: true },
        { title: "Series", field: "Series", headerFilter: true },
        {
          title: "Product",
          field: productNameColumn,
          formatter: function(cell) {
            const value = cell.getValue();
            const rowData = cell.getRow().getData();
            const url = rowData["URL"];
            if (url) {
              return `<a href="${url}" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline hover:no-underline cursor-pointer">${value}</a>`;
            }
            return value;
          },
          widthGrow: 3,
          headerFilter: true
        },
        { title: "Category", field: "Category", headerFilter: true },
        { title: "Date", field: "Date", headerFilter: true },
        { title: "Notes", field: "Notes", headerFilter: true },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: productNameColumn, dir: "asc"}]
    });
  }

  // ==================== RECENT & UPCOMING PAGE (keeps Prd#, with filters) ====================
  if (document.getElementById('releases-table')) {
    new Tabulator("#releases-table", {
      data: data,
      layout: "fitColumns",
      pagination: "local",
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      columns: [
        { title: "Company", field: "!Company", headerFilter: true },
        { title: "Series", field: "Series", headerFilter: true },
        {
          title: "Product",
          field: productNameColumn,
          formatter: function(cell) {
            const value = cell.getValue();
            const rowData = cell.getRow().getData();
            const url = rowData["URL"];
            if (url) {
              return `<a href="${url}" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline hover:no-underline cursor-pointer">${value}</a>`;
            }
            return value;
          },
          widthGrow: 3,
          headerFilter: true
        },
        { title: "Category", field: "Category", headerFilter: true },
        { title: "Prd#", field: "Prd#" },
        { title: "Date", field: "Date", headerFilter: true },
        { title: "Notes", field: "Notes", headerFilter: true },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]
    });
  }
});
