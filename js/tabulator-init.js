// =============================================
// TABULATOR WITH MODAL FOR VEKTEK (TEST)
// =============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 Tabulator ready - modal test for Vektek");

  const productsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQIPJY_NAtPe1A9GUQkf5d1Jw6HoH79OMcTQMB20MtnlUv3DfRa_-Q_7nGTNt-gxnpQSCPuD5ZU7S/pub?gid=2126428328&single=true&output=csv";

  const data = await loadCSV(productsCSV);

  // Custom date sorter (keeps newest first)
  const dateSorter = function(a, b) {
    const parseDate = (val) => {
      if (!val) return 0;
      const parts = String(val).split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[0] - 1, parts[1]).getTime();
      }
      return new Date(val).getTime();
    };
    return parseDate(b) - parseDate(a);
  };

  const table = new Tabulator("#product-table", {
    data: data,
    layout: "fitDataTable",
    pagination: "local",
    paginationSize: 100,
    paginationSizeSelector: [25, 50, 100, 250],
    variableHeight: true,
    initialSort: [{column: "Date", dir: "desc"}],
    columns: [
      { title: "Company", field: "!Company", headerFilter: true, formatter: "textarea", widthGrow: 1 },
      { title: "Series", field: "Series", headerFilter: true, formatter: "textarea", widthGrow: 1 },
      {
        title: "Product",
        field: "Product",
        formatter: function(cell) {
          const value = cell.getValue();
          const rowData = cell.getRow().getData();
          const url = rowData["URL"];
          let html = value;
          if (url) {
            html = `<a href="${url}" target="_blank" class="text-blue-400 hover:text-blue-300 underline">${value}</a>`;
          }
          // Clickable for modal (only Vektek for now)
          if (value && value.toLowerCase().includes("vektek")) {
            html = `<span class="cursor-pointer hover:text-emerald-300 underline" onclick="openVektekModal(${JSON.stringify(rowData)})">${value}</span>`;
          }
          return html;
        },
        widthGrow: 1.5,
        headerFilter: true
      },
      { title: "Category", field: "Category", headerFilter: true, formatter: "textarea", widthGrow: 1 },
      { title: "Date", field: "Date", sorter: dateSorter, headerFilter: true, widthGrow: 1 },
      { title: "Notes", field: "Notes", headerFilter: true, formatter: "textarea", widthGrow: 1.2 },
      { title: "URL", field: "URL", visible: false },
      { title: "ExtraInfo", field: "ExtraInfo", visible: false }
    ]
  });
});

// Modal function (Vektek test)
window.openVektekModal = function(rowData) {
  let modalHTML = `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onclick="if(event.target === this) this.remove()">
      <div class="bg-gray-900 rounded-3xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-auto" onclick="event.stopImmediatePropagation()">
        <h2 class="text-3xl font-bold mb-6 text-emerald-300">${rowData.Product || 'Vektek'}</h2>
        
        <div class="prose prose-invert text-gray-200">
          ${rowData.ExtraInfo ? rowData.ExtraInfo : '<p class="text-gray-400">No extra info added yet for this product. Paste text or images here in the Google Sheet "ExtraInfo" column.</p>'}
        </div>

        <div class="mt-8 flex gap-4">
          <button onclick="this.closest('.fixed').remove()" 
                  class="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-2xl font-medium">Close</button>
          ${rowData.URL ? `<a href="${rowData.URL}" target="_blank" class="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-center rounded-2xl font-medium">View on Amazon</a>` : ''}
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);
};
