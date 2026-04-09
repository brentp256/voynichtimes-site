// =============================================
// WIDER TABLE + WRAPPED NOTES + RELIABLE DATE SORT
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - wider table + wrapped Notes + reliable date sort");

  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";

  const data = await loadCSV(productsCSV);

  // Robust date sorter for MM/DD/YYYY
  const dateSorter = function(a, b) {
    const parseDate = (val) => {
      if (!val) return 0;
      const parts = String(val).split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[0] - 1, parts[1]).getTime();
      }
      return new Date(val).getTime();
    };
    return parseDate(a) - parseDate(b);
  };

  if (document.getElementById('product-table')) {
    new Tabulator("#product-table", {
      data: data,
      layout: "fitData",                    // uses full available width
      pagination: "local",
      paginationSize: 25,
      paginationSizeSelector: [10, 25, 50, 100],
      variableHeight: true,                 // allows rows to grow for wrapped text
      columns: [
        { title: "Company", field: "!Company", headerFilter: true, widthGrow: 1 },
        { title: "Series", field: "Series", headerFilter: true, widthGrow: 1 },
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
        { title: "Category", field: "Category", headerFilter: true, widthGrow: 1 },
        { title: "Date", field: "Date", sorter: dateSorter, headerFilter: true, widthGrow: 1 },
        { 
          title: "Notes", 
          field: "Notes", 
          headerFilter: true,
          formatter: "textarea",            // wraps long text
          widthGrow: 4                      // gives Notes plenty of room
        },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]   // starts with newest/upcoming
    });
  }
});
