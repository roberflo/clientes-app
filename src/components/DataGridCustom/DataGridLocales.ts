import { GridLocaleText } from "./GridLocaleTextApi";

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: "No se encuentran registros, es tiempo de crear uno!",
  noResultsOverlayLabel: "No se encuentran registros, crea uno!",
  errorOverlayDefaultLabel: "Tenemos un error,vuelve a intentarlo.",

  // Density selector toolbar button text
  toolbarDensity: "Densidad",
  toolbarDensityLabel: "Densidad",
  toolbarDensityCompact: "Compacto",
  toolbarDensityStandard: "Standard",
  toolbarDensityComfortable: "Confortable",

  // Columns selector toolbar button text
  toolbarColumns: "Columnas",
  toolbarColumnsLabel: "Selecciona una columna",

  // Filters toolbar button text
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Show filters",
  toolbarFiltersTooltipHide: "Hide filters",
  toolbarFiltersTooltipShow: "Show filters",
  toolbarFiltersTooltipActive: (count) => (count !== 1 ? `${count} active filters` : `${count} active filter`),

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "Buscando…",
  toolbarQuickFilterLabel: "Buscar",
  toolbarQuickFilterDeleteIconLabel: "Limpiar",

  // Export selector toolbar button text
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Descargar  CSV",
  toolbarExportPrint: "Imprimir",
  toolbarExportExcel: "Descargar Excel",

  // Columns panel text
  columnsPanelTextFieldLabel: "Encontrar columna",
  columnsPanelTextFieldPlaceholder: "Titulo de Columna ",
  columnsPanelDragIconLabel: "Reordenar columna",
  columnsPanelShowAllButton: "Mostrar todo",
  columnsPanelHideAllButton: "Ocultar todo",

  // Filter panel text
  filterPanelAddFilter: "Add filter",
  filterPanelDeleteIconLabel: "Delete",
  filterPanelLinkOperator: "Logic operator",
  filterPanelOperators: "Operador", // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: "Y",
  filterPanelOperatorOr: "O",
  filterPanelColumns: "Columnas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Filtrar por Valor",

  // Filter operators text
  filterOperatorContains: "contiene",
  filterOperatorEquals: "es igual",
  filterOperatorStartsWith: "empieza con",
  filterOperatorEndsWith: "termina con",
  filterOperatorIs: "es",
  filterOperatorNot: "no es",
  filterOperatorAfter: "esta despues",
  filterOperatorOnOrAfter: "esta antes o despues",
  filterOperatorBefore: "esta antes",
  filterOperatorOnOrBefore: "is on or before",
  filterOperatorIsEmpty: "es vacio",
  filterOperatorIsNotEmpty: "no es vacio",
  filterOperatorIsAnyOf: "es alguno de",

  // Filter values text
  filterValueAny: "any",
  filterValueTrue: "Verdadero",
  filterValueFalse: "Falso",

  // Column menu text
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Mostrar columnas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Unsort",
  columnMenuSortAsc: "Ordenar Ascendente",
  columnMenuSortDesc: "Ordernar Descendente",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? `${count} Filtros Activos` : `${count} Filtro Activo`),
  columnHeaderFiltersLabel: "Mostrar Filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Rows selected footer text
  footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`),

  // Total row amount footer text
  footerTotalRows: "Total de Filas:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Checkbox selection",
  checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
  checkboxSelectionUnselectAllRows: "Deseleccionar todas las filas",
  checkboxSelectionSelectRow: "Seleccionar fila",
  checkboxSelectionUnselectRow: "Deseleccionar fila",

  // Boolean cell text
  booleanCellTrueLabel: "Si",
  booleanCellFalseLabel: "No",

  // Actions cell more text
  actionsCellMore: "more",

  // Column pinning text
  pinToLeft: "Pin Izquierda",
  pinToRight: "Pin Derecha",
  unpin: "Unpin",

  // Tree Data
  treeDataGroupingHeaderName: "Agrupar",
  treeDataExpand: "see children",
  treeDataCollapse: "hide children",

  // Grouping columns
  groupingColumnHeaderName: "Agrupar",
  groupColumn: (name) => `Agrupar por ${name}`,
  unGroupColumn: (name) => `Detener Agrupar por ${name}`,

  // Master/detail
  detailPanelToggle: "Detail panel toggle",
  expandDetailPanel: "Expandir",
  collapseDetailPanel: "Colapsar",

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: "Reordenamiento de filas",

  // Aggregation
  aggregationMenuItemHeader: "Aggregation",
  aggregationFunctionLabelSum: "suma",
  aggregationFunctionLabelAvg: "promedio",
  aggregationFunctionLabelMin: "minimo",
  aggregationFunctionLabelMax: "maximo",
  aggregationFunctionLabelSize: "size",
};
