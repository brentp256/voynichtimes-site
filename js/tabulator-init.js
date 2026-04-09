// =============================================
// FIXED PIXEL WIDTHS - TIGHTER COLUMNS + FULL WRAPPING + RELIABLE DATE SORT
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - fixed pixel widths + full wrapping");

  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";
  const productNameColumn = "Product";

  const data = await loadCSV(productsCSV);

  if (document.getElementById('product-table')) {
    new Tabulator("#product-table", {
      data: data,
      layout: "fitColumns",               // fills container but respects fixed widths
      pagination: "local",
      paginationSize: 100,
      paginationSizeSelector: [25, 50, 100, 250],
      variableHeight: true,
      columns: [
        { title: "Company", field: "!Company", headerFilter: true, formatter: "textarea", width: 130 },
        { title: "Series", field: "Series", headerFilter: true, formatter: "textarea", width: 150 },
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
          width: 320,                     // skinnier Product
          headerFilter: true
        },
        { title: "Category", field: "Category", headerFilter: true, formatter: "textarea", width: 130 },
        { title: "Date", field: "Date", sorter: "date", sorterParams: { format: "MM/DD/YYYY" }, headerFilter: true, width: 110 },
        { 
          title: "Notes", 
          field: "Notes", 
          headerFilter: true,
          formatter: "textarea",
          width: 250                      // tighter Notes
        },
        { title: "URL", field: "URL", visible: false }
      ],
      initialSort: [{column: "Date", dir: "desc"}]
    });
  }
});
