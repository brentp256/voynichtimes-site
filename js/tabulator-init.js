// =============================================
// CLEAN TABLE - TIGHT COLUMNS + FULL WRAPPING + RELIABLE DATE SORT
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - tight columns + full wrapping");

  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";

  const data = await loadCSV(productsCSV);

  // Simple custom date sorter for MM/DD/YYYY
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
      layout: "fitDataTable",
      pagination: "local",
      paginationSize: 100,
      paginationSizeSelector: [25, 50, 100, 250],
      variableHeight: true,
      columns: [
        { title: "Company", field: "!Company", headerFilter: true, formatter: "textarea", widthGrow: 1 },
        { title: "Series", field: "Series", headerFilter: true, formatter: "textarea", widthGrow: 1 },
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
          widthGrow: 1.5,
          headerFilter: true
        },
        { title: "Category", field: "Category", headerFilter: true, formatter: "textarea", widthGrow: 1 },
        { title: "Date", field: "Date", sorter: dateSorter, headerFilter: true, widthGrow: 1 },
        { 
          title: "Notes", 
          field: "Notes", 
          headerFilter: true,
          formatter: "textarea",
          widthGrow: 1.5
        },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]
    });
  }
});
