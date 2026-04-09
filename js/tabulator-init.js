// =============================================
// FINAL CLEAN TABLE - ROBUST DATE SORTING + FILTERS
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - Amazon links + filters + robust date sorting");

  // ==================== YOUR REAL DATA ====================
  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";
  // =======================================================

  const data = await loadCSV(productsCSV);

  // Custom date sorter for MM/DD/YYYY format
  const dateSorter = function(a, b, aRow, bRow, column, dir, sorterParams) {
    const parseDate = (val) => {
      if (!val) return 0;
      const parts = val.split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[0] - 1, parts[1]).getTime();
      }
      return new Date(val).getTime();
    };
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateA - dateB;
  };

  // ==================== FULL DATABASE PAGE (no Prd#, filters, robust date sort) ====================
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
        { title: "Date", field: "Date", sorter: dateSorter, headerFilter: true },
        { title: "Notes", field: "Notes", headerFilter: true },
        { title: "URL", field: "URL", visible: false }
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
        { title: "Date", field: "Date", sorter: dateSorter, headerFilter: true },
        { title: "Notes", field: "Notes", headerFilter: true },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]   // newest first
    });
  }
});
