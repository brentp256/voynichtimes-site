// =============================================
// CLEAN TABLE WITH BLUE CLICKABLE LINKS
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
          formatter: function(cell) {
            const value = cell.getValue();
            const rowData = cell.getRow().getData();
            const url = rowData["URL"];
            if (url) {
              return `<a href="${url}" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline hover:no-underline cursor-pointer">${value}</a>`;
            }
            return value;
          },
          widthGrow: 3
        },
        { title: "Category", field: "Category" },
        { title: "Prd#", field: "Prd#" },
        { title: "Date", field: "Date" },
        { title: "Notes", field: "Notes" },
        { title: "URL", field: "URL", visible: false }   // hidden - only used for links
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
          formatter: function(cell) {
            const value = cell.getValue();
            const rowData = cell.getRow().getData();
            const url = rowData["URL"];
            if (url) {
              return `<a href="${url}" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline hover:no-underline cursor-pointer">${value}</a>`;
            }
            return value;
          },
          widthGrow: 3
        },
        { title: "Category", field: "Category" },
        { title: "Prd#", field: "Prd#" },
        { title: "Date", field: "Date" },
        { title: "Notes", field: "Notes" },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]
    });
  }
});
