export function getColDefs() {
  // const header_template = '<span class="text-danger" style="height:30px;">Some Value </span>';
    return [
        {
          "headerName": "",
          "children": [
            {
              "headerName": "Client Name",
              "pinned": "left",
              "field": "ClientName",
              "width": 150,
              "cellClass": "clientName"
            },
            {
              "headerName": "Client Id",
              "field": "ClientId",
              "hide": true
            },
            {
              "headerName": "Total",
              "pinned": "left",              
              "field": "AnnTotal",
              "width": 90,
              "cellRenderer": "agAnimateShowChangeCellRenderer",
              "valueGetter": function aPlusBValueGetter(params) {
                let total = 0;
                // const stringToCheck = 'Total'
                const columnGroupLength = params.columnApi.getAllDisplayedColumnGroups().length;
                params.columnApi.getAllDisplayedColumnGroups().forEach(function(key, index) {
                    if(index > 0 && index < ( columnGroupLength- 1)) {
                        total += parseInt(params.api.getValue(key.getLeafColumns()[0], params.node)); // params.data[key.getLeafColumns()[0].colDef.field];
                    }
                })
                // Object.keys(params.data).forEach(function(key, Index) {
                //     var x = key.substr(0, stringToCheck.length);
                //     if(x===stringToCheck && key.indexOf(stringToCheck+'_')===-1 ) {
                //         total += params.data[key];       
                //     }
                // }
                // );
                return total;
              }
            }
          ]
        },
        {
          "headerName": "Credit",
          "headerGroupComponent": "groupHeaders",
          "children": [
            {
              "headerName": 'Ann $',
              "colId": 1001,              
              "field": "Credit_Y_M1",
              "width": 125,
              // "cellStyle": {color: 'blue'},
              // "cellRenderer": "agAnimateSlideCellRenderer",
              // "headerCellRenderer": function hrendere(params) {
              //   var eCell = document.createElement('span');
              //       eCell.innerHTML = '<b>' + params.value + '</b>'
              //       return eCell;
              //   // return "<b>" + params.value +"</b>"
              // },
              "valueGetter": function fnValueGetter(params) {
                let total = 0;
                const stringToCheck = '_Target'
                params.column.parent.parent.getLeafColumns().forEach(function(key, index) {
                    if(index > 0 && key.colDef.field.indexOf(stringToCheck)>0) {
                        total += parseInt(params.data[key.colDef.field]);
                    }
                })
                return total;
              }
            },
            {
              "headerName": "Investment Grade",
              "colId": 1008,
              "children": [
                {
                  "headerName": "Total",
                  "editable": true,
                  "field": "InvestmentGrade_Target",
                  "width": 125,
                  "valueFormatter": "numberFormatter",
                  "valueParser": "numberParser",
                  "cellClassRules": {
                    'rag-green': 'rowIndex % 2 === 0',
                    'rag-amber': 'rowIndex % 2 !== 0'
                  }
                },
                {
                  "headerName": "YOY",
                  "cellClassRules": {
                    'rag-green': 'rowIndex % 2 === 0',
                    'rag-amber': 'rowIndex % 2 !== 0'
                  },                  
                  "field": "InvestmentGrade_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  "cellClassRules": {
                    'rag-green': 'rowIndex % 2 === 0',
                    'rag-amber': 'rowIndex % 2 !== 0'
                  },                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "InvestmentGrade_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "High Yield",
              "colId": 1009,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "HighYield_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "HighYield_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "HighYield_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "ABS",
              "colId": 1010,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "ABS_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "ABS_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "ABS_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Loans",
              "colId": 1011,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Loans_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Loans_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Loans_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Money Market",
              "colId": 1012,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "MoneyMarket_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "MoneyMarket_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "MoneyMarket_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "CLO",
              "colId": 1013,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "CLO_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "CLO_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "CLO_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Convertibles",
              "colId": 1014,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Convertibles_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Convertibles_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Convertibles_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            }
          ]
        },
        {
          "headerName": "FX",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1002,
              
              "field": "FX_Y_M1",
              "width": 125
            },
            {
              "headerName": "G11 Spots",
              "colId": 1030,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "G11Spots_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "G11Spots_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "G11Spots_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "G11 Options",
              "colId": 1031,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "G11Options_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "G11Options_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "G11Options_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "G11 Outrights",
              "colId": 1032,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "G11Outrights_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "G11Outrights_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "G11Outrights_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "G11 Swaps",
              "colId": 1033,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "G11Swaps_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "G11Swaps_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "G11Swaps_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "EM Spots",
              "colId": 1034,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "EMSpots_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "EMSpots_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "EMSpots_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "EM Options",
              "colId": 1035,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "EMOptions_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "EMOptions_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "EMOptions_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "EM Outrights",
              "colId": 1036,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "EMOutrights_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "EMOutrights_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "EMOutrights_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "EM Swaps",
              "colId": 1037,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "EMSwaps_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "EMSwaps_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "EMSwaps_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            }
          ]
        },
        {
          "headerName": "Rates",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1003,
              
              "field": "Rates_Y_M1",
              "width": 125
            },
            {
              "headerName": "Rates Derivatives",
              "colId": 1017,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "RatesDerivatives_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "RatesDerivatives_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "RatesDerivatives_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Rates Cash",
              "colId": 1018,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "RatesCash_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "RatesCash_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "RatesCash_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Structured Rates",
              "colId": 1019,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "StructuredRates_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "StructuredRates_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "StructuredRates_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            }
          ]
        },
        {
          "headerName": "Municipals",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1004,
              
              "field": "Municipals_Y_M1",
              "width": 125
            }
          ]
        },
        {
          "headerName": "Futures",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1005,
              
              "field": "Futures_Y_M1",
              "width": 125
            },
            {
              "headerName": "Client Clearing",
              "colId": 1020,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "ClientClearing_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "ClientClearing_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "ClientClearing_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Client Execution",
              "colId": 1021,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "ClientExecution_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "ClientExecution_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "ClientExecution_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            }
          ]
        },
        {
          "headerName": "Commodities",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1006,
              
              "field": "Commodities_Y_M1",
              "width": 125
            },
            {
              "headerName": "Gas",
              "colId": 1022,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Gas_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Gas_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Gas_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Crude Oil",
              "colId": 1023,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "CrudeOil_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "CrudeOil_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "CrudeOil_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Base Metals",
              "colId": 1024,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "BaseMetals_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "BaseMetals_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "BaseMetals_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Index",
              "colId": 1025,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Index_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Index_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Index_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Precious Metals",
              "colId": 1026,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "PreciousMetals_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "PreciousMetals_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "PreciousMetals_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Power",
              "colId": 1027,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Power_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Power_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Power_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Emmissions",
              "colId": 1028,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Emmissions_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Emmissions_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Emmissions_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            },
            {
              "headerName": "Ags",
              "colId": 1029,
              "children": [
                {
                  "headerName": "Total",
                  
                  "field": "Ags_Target",
                  "width": 125
                },
                {
                  "headerName": "YOY",
                  
                  "field": "Ags_YOY",
                  "width": 125
                },
                {
                  "headerName": "FY 2019 CV",
                  
                  "editable": true,
                  "cellEditor": "numericEditor1",
                  "field": "Ags_Y_M1",
                  "width": 125
                }
              ],
              "columnGroupShow": "open"
            }
          ]
        },
        {
          "headerName": "401K",
          "children": [
            {
              "headerName": "Ann $",
              "colId": 1007,
              
              "field": "401K_Y_M1",
              "width": 125
            }
          ]
        },
        {
          "headerName": "",
          "headerGroupComponent": "switchCoverage",
          "rowSpan": 2,
          "children": [
            {
              "headerName": "Comments",
              "field": "Comments",
              "editable": true,
              "cellEditor": "popupEditor",
              "width": 150
            },
            {
              "headerName": "Coverage",
              "field": "Coverage",
              "width": 150,
              "valueFormatter": function fnValueFormatter(params) {
                return params.value ? 'right' : 'wrong'
              }
            }
          ]
        }
      ]
}