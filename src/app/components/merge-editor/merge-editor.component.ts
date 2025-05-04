import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

// Declare monaco for TypeScript
declare const monaco: any;

@Component({
  selector: 'app-merge-editor',
  templateUrl: './merge-editor.component.html',
  styleUrls: ['./merge-editor.component.scss']
})
export class MergeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('originalContainer') originalContainer!: ElementRef;
  @ViewChild('modifiedContainer') modifiedContainer!: ElementRef;
  @ViewChild('resultContainer') resultContainer!: ElementRef;

  private originalEditor: any;
  private modifiedEditor: any;
  private resultEditor: any;
  private diffEditor: any;
  private currentDiffIndex = 0;
  private diffDecorations: string[] = [];
  private differences: any[] = [];
  
  // Sample content for demo purposes
  private originalContent = `{
  "id": 10385,
  "journeyId": 10385,
  "isBodyComponent": true,
  "selector": "m-panel",
  "role": [
    "MYS_SUPERUSER",
    "MYS_USER"
  ],
  "loadScript": true,
  "loadStyle": false,
  "layoutConfig": {
    "layoutType": "vertical",
    "layoutHorizontalAlign": "left",
    "layoutVerticalAlign": "left",
    "layoutFlex": "100%"
  },
  "properties": {
    "style": {
      "height": "auto",
      "padding": "10px"
    }
  },
  "action": "new",
  "events": {},
  "components": [
    {
      "id": "secondPageform",
      "selector": "m-form",
      "role": [
        "MYS_SUPERUSER",
        "MYS_USER"
      ],
      "properties": {
        "style": {
          "margin": "2px",
          "margin-bottom": "5%",
          "height": "auto",
          "width": "auto",
          "display": "flex",
          "flex-direction": "column",
          "justifyItems": "center"
        }
      },
      "dataObj": {
        "data": "test string"
      },
      "formGroup": {
        "formGroupName": "proposerDetails"
      },
      "components": [
        {
          "id": "firstof2ndAccordianPannel",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Member Details",
          "components": [
            {
              "id": "div1",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "17be2d72-4d3f-4054-b476-e0d7ab6116c0",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Title",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "title"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-5dqvok4q"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setTitle"
                  },
                  "dbColumn": {
                    "name": "title",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "0402bae6-a54a-4939-8fbf-2a9923dbeca9",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "First Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "firstName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "First Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "firstName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "1ac347f3-ceb8-446e-8b85-3b676518e2e6",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Middle Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "middleName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Middle Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "middleName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "334332be-641f-4d34-b40a-9ab45894ca12",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Last Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "lastName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Last Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "lastName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "eab06135-d011-4894-abc2-e0144590796e",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-hh6qozdv",
                      "name": "Male"
                    },
                    {
                      "id": "id-ncmuz64e",
                      "name": "Female"
                    },
                    {
                      "id": "id-x3mlh2uk",
                      "name": "Transgender"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Gender",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gender"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-x3mlh2uk"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setGender"
                  },
                  "dbColumn": {
                    "name": "gender",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "00dbfeec-8a92-4be7-bd21-5c5f7c59276b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dob",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dob"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "92233b27-c250-4ccf-b294-048239fda5a8",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Height",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "height",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Height",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "height"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "6a09027a-0dfb-45d6-8332-cab4e7398989",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "weight",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "weight",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Weight",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "weight"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "4248d3bf-ec8a-4d0c-b406-09506e977978",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Nationality",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nationality"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-y2125ifp"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setNationality"
                  },
                  "dbColumn": {
                    "name": "nationality",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "b70213c5-9c33-4d47-b4eb-6aad6a31026c",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "AadharNumber",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "aadharNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Aadhar Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "aadharNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "125624f7-81eb-43b1-b0a8-50d06f5f1e46",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "PanCard Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "pancardnumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "PanCard Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "pancardnumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e67af888-93ce-4239-a3e4-e36a2f5c2d5b",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-0diphfcu",
                      "name": "self"
                    },
                    {
                      "id": "id-tduliiyy",
                      "name": "daughter"
                    },
                    {
                      "id": "id-4ebaz05h",
                      "name": "brother"
                    },
                    {
                      "id": "id-z5n9j0ww",
                      "name": "sister"
                    },
                    {
                      "id": "id-s70pm7xy",
                      "name": "Mother"
                    },
                    {
                      "id": "id-iv44me96",
                      "name": "father"
                    },
                    {
                      "id": "id-903q5unr",
                      "name": "son"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Relationship with proposer",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "relationship"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-903q5unr"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "relationship",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "7976d77b-666e-465d-bee2-d92cbe3bf90f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-sw8by0bz",
                      "name": "single"
                    },
                    {
                      "id": "id-kimp3kxp",
                      "name": "married"
                    },
                    {
                      "id": "id-9mwcouv0",
                      "name": "Divorced"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Marital Status",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "maritalstatus"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-9mwcouv0"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setMaritalStatus"
                  },
                  "dbColumn": {
                    "name": "maritalstatus",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "d9959a5c-9526-4516-b030-6c51056330c2",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Educational Qualification",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "educationalQualification"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-uyrgm9dc"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setEducationalQualification"
                  },
                  "dbColumn": {
                    "name": "educationalDetails",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "08fa63bf-40d2-457b-af98-70a99b85f84b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Gross Monthly income",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "grossMonthlyincome",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Gross Monthly income",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "grossMonthlyincome"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "b623975f-28b0-49b1-87fd-856957c1feb1",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-165xissn",
                      "name": "Teacher"
                    },
                    {
                      "id": "id-jguab9t4",
                      "name": "Student"
                    },
                    {
                      "id": "id-t8zifvk9",
                      "name": "IT Professional"
                    },
                    {
                      "id": "id-4spzyc67",
                      "name": "Doctor"
                    },
                    {
                      "id": "id-xs1qyf0x",
                      "name": "HouseWife"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Occupation",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "occupation"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-xs1qyf0x"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "occupation",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "0afa17fa-5e0d-4149-8e1a-ba9bb9bfa03d",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Proposer KYC Details",
                "style": {
                  "color": "#6a0193",
                  "fontSize": "30px",
                  "paddingLeft": "10px",
                  "marginTop": "20px",
                  "width": "100%",
                  "marginBottom": "20px"
                }
              }
            },
            {
              "id": "div2",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "08bb3266-d557-4acf-9406-f74232076837",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-k98pdxyu",
                      "name": "PAN"
                    },
                    {
                      "id": "id-3o9por21",
                      "name": "CKYC"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "ID Proof type",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "idproofType"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-3o9por21"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "idproof",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1f54c4b6-77b2-4a3b-ab2f-584bdc0ff9ed",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pan Number",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "panNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pan Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "panNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "0f0049fc-8823-4718-a1e3-b022acf2ca23",
                  "selector": "m-date-picker",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dateOfBirthforKYC",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dateOfBirthforKYC"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "30e832d1-fa97-4e26-a7b6-e595a5efcba5",
                  "selector": "m-button",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "buttonText": "Validate",
                  "properties": {
                    "className": "m-button",
                    "type": "button",
                    "style": {
                      "height": "50px",
                      "width": "150px",
                      "backgroundColor": "#530070",
                      "color": "#ffffff",
                      "margin-top": "24px"
                    }
                  },
                  "layout": {
                    "width": "auto"
                  },
                  "events": {
                    "click": "custom.calculatePremium.kycValidate"
                  }
                },
                {
                  "id": "17a44a70-984c-4644-9a5b-926c06d5a8c0",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-8efq06wp",
                      "name": "Passport"
                    },
                    {
                      "id": "id-74jeqzjm",
                      "name": "Voter ID"
                    },
                    {
                      "id": "id-3bvr9bv4",
                      "name": "Driving License"
                    },
                    {
                      "id": "id-ikr39dhl",
                      "name": "UID"
                    },
                    {
                      "id": "id-rg4ctsfv",
                      "name": "NREGA Job Card"
                    },
                    {
                      "id": "id-2oxzddcm",
                      "name": "GSTIN"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "POA Type",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "poaType"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "poaType",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "dbae9294-62ed-48fc-b120-db7fea2498ba",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Passport Number Here!",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "passportNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Passport Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "passportNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "909b3c62-f443-422a-adf9-c6f8e7bfff8d",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "File Numbe Here!",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "fileNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "File Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "fileNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "2-8823-4718-a1e3-b022acf2ca23",
                  "selector": "m-date-picker",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dateOfBirthforpassport",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dateOfBirthforpassport"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "b2c4c304-8fef-42a3-af3a-83e446cc66a0",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Voter Id Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "voterIdNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Voter ID Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voterIdNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "2c9435de-198c-4273-80ad-52c4ac529ff8",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Driving License Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "drivingLicenseNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Driving License Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "drivingLicenseNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e7e7371c-0bb7-46ec-b663-5e569fbdb724",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "UID Number",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "uidNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "UID Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "uidNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "fe5c6268-59b3-4a65-8538-06d2b7f73cdc",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-goa39grf",
                      "name": "Female"
                    },
                    {
                      "id": "id-m9xxx56y",
                      "name": "Male"
                    },
                    {
                      "id": "id-vaygciih",
                      "name": "Transgender"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Gender",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "kycGender"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-vaygciih"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "kycGender",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "9ef13674-a092-4bec-b707-74ebbe0be982",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Full Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "kycFullName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Full Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "kycFullName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "1377796c-de5b-4559-8ce2-5fb1fc50a2df",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "NREGA Job card Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nregaJobcardNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "NREGA Job card Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nregaJobcardNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "ac75df7d-ea33-4ec1-852a-c6ba0ad0ab12",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "GSTIN Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "gstinNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "GSTIN Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gstinNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "a540ada1-d011-4928-8d5d-8ed2867b40d2",
                  "selector": "m-button",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "buttonText": "Validate POA",
                  "properties": {
                    "className": "m-button",
                    "style": {}
                  },
                  "layout": {
                    "width": "auto"
                  },
                  "events": {}
                }
              ]
            },
            {
              "id": "718f761d-4fdf-4031-af60-b5d4d0ab8b77",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Nominee Details",
                "style": {
                  "color": "#6a0193",
                  "marginTop": "20px",
                  "marginBottom": "20px",
                  "paddingLeft": "10px",
                  "fontSize": "30px"
                }
              }
            },
            {
              "id": "div3",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "2f613afa-1aa4-450c-b0f4-1223b6168c05",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Nominee Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "6994b6fc-5600-4d45-8be2-633a6a539bfd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "NomineeDOB",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeDOB",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeDOB"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "f8fdd851-172c-4c6a-aad7-985a4f75751f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-94xhg8by",
                      "name": "son"
                    },
                    {
                      "id": "id-xpcitq6s",
                      "name": "daughter"
                    },
                    {
                      "id": "id-9rvkj5gt",
                      "name": "Mother"
                    },
                    {
                      "id": "id-xbd5lnxi",
                      "name": "Father"
                    },
                    {
                      "id": "id-u38goxwd",
                      "name": "Sister"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Nominee Relation With insured",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeRelationWtuhinsured"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-u38goxwd"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "nomineeRelationWithInsured",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1218519e-fbd6-45f0-baf0-f36b4f901bdd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Nominee Allocation Percentage",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeAllocationPercentage",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Allocation Percentage",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeAllocationPercentage"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "1218239e-fbd6-45f0-baf0-f36cadcf901bdd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Appointee Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "appointeeName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Appointee Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "appointeeName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "f8fee851-172c-4c6a-vvd7-985afd75751f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Appointee Relationship",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "appointeeRelationship"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-u38go9wd"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setAppointeeRelation"
                  },
                  "dbColumn": {
                    "name": "appointeeRelationship",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "div",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "08ce3d2c-44c5-4646-bc13-5c8ba2163885",
                  "selector": "m-label",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you have any Pre-Existing Disease?*",
                    "style": {
                      "color": "#6a0193",
                      "marginTop": "20px",
                      "marginBottom": "20px",
                      "paddingLeft": "10px"
                    }
                  }
                },
                {
                  "id": "01b0dieseaseCheck",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "diseaseCheck"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {
                    "change": "custom.calculatePremium.showQuestions"
                  },
                  "validations": {}
                }
              ]
            },
            {
              "id": "div4",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "78e1733d-a0ca-4f5d-b8a5-0b412b46ee96",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Has any of the persons to be insured suffer from/or investigated for any of the following?Disorder of the heart, or circulatory system, chest pain, high blood pressure, stroke, asthma any respiratory conditions, cancer tumor lump of any kind, diabetes, hepatitis, disorder of urinary tract or kidneys, blood disorder, any mental or psychiatric conditions, any disease of brain or nervous system, fits (epilepsy) slipped disc, backache, any congenital/ birth defects/ urinary diseases, AIDS or positive HIV, If yes, indicate in the table given below.If yes please provide details",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "01b09377-ef37-4eed-9e7a-986a51cd93c3",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "25e8e5a5-2dcb-4e25-a219-acd1e3ce9b85",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "details ",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details ",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "details "
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "1d1d45b9-2846-4cd1-a067-1368c548c5a7",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you or any of the family members to be covered have/had any health complaints/met with any accident in the past 4 years and prior to 4 years and have been taking treatment, regular medication (self/ prescribed)or planned for any treatment / surgery / hospitalization?",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "56c4532d-0511-4a36-8829-6b823222dea8",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "fcb91fed-fb06-4278-be93-bf14f9978476",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details Here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSecond",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSecond"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "b2ab1102-83be-49dd-a5f9-9f2cdbcde04d",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you smoke cigarettes or consume tobacco (chewing paste) / alcohol, nicotine or marijuana in any form? Please give duration and daily consumption",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "711f706d-04c2-405b-ba01-515eaad0a634",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "d7dd4f49-e539-40e0-b714-d83b940a1867",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsThird",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsThird"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "083b485e-9fbf-43dd-b9d7-18534199c80a",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Have you or any of your immediate family members (father, mother, brother, or sister) have/had cancer, heart attack, or stroke and at what age? Prior to age 60?",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "b7b04090-d35a-4729-b84f-0afc3671012b",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "ab213003-2cd4-4039-a4ec-6dfd3988ac04",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsFourth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsFourth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e24149d5-1e1b-4d57-8e15-8dd9a0f74f85",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Has any proposal for life, critical illness or health related insurance on your life or lives ever been postponed, declined or accepted on special terms? If yes, give details",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "8ba5ad5e-003f-4dcb-abba-0ec79c31943d",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "dfb8859c-f209-46b0-a576-e54b5f2b882d",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsFifth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsFifth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "9a078638-7c08-4522-90d3-7da43e908f6e",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Are you vaccinated against Covid 19? (If yes, Give Vaccination Details.)",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "e360379b-719a-440d-92a1-a5a3db40e054",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "b0b296bd-a5db-497f-a0d0-6e11381e98e3",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSixth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSixth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "5946371d-7257-4009-9839-29092caf5bab",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Have you or any of the persons proposed to be insured were/are detected as Covid positive (If Yes, Give Date of Detection and Treatment Details.)",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "5472dbe5-f620-42c3-acaa-483a51426393",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "77368942-d2db-486a-ae70-10d06d7f8e9b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSeven",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSeven"
                  },
                  "events": {},
                  "validations": {}
                }
              ]
            },
            {
              "id": "div5",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "9dc43079-89c7-4649-8f96-cf88f7074923",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-zlfk2vsp",
                      "name": "Gold"
                    },
                    {
                      "id": "id-2lsomfas",
                      "name": "Platinum"
                    },
                    {
                      "id": "id-a3ooqopk",
                      "name": "Silver"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Sub Plan",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "subPlanDiseaseForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-a3ooqopk"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                },
                {
                  "id": "424e50e6-17ea-47de-b0ad-8b27f397aaa3",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-76r4wocr",
                      "name": "1000000"
                    },
                    {
                      "id": "id-4h1oafoq",
                      "name": "2000000"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Sum Insured",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "sumInsuredDiseaseForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-4h1oafoq"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                },
                {
                  "id": "dcb12856-b94f-4312-ba89-ca6cecfaa8c3",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-kzomjsln",
                      "name": "Yes"
                    },
                    {
                      "id": "id-xjuktqh0",
                      "name": "No"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Room Rent Capping?",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "roomRentCapping"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-xjuktqh0"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                }
              ]
            },
            {
              "id": "30e832d1-fa97-4e26-a7b6-e595a5efcba5",
              "selector": "m-button",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "buttonText": "Proceed",
              "properties": {
                "className": "m-button",
                "style": {
                  "height": "50px",
                  "width": "150px",
                  "backgroundColor": "#530070",
                  "color": "#ffffff",
                  "margin": "10px",
                  "float": "right"
                }
              },
              "layout": {
                "width": "100%"
              },
              "events": {}
            }
          ]
        },
        {
          "id": "secondof2ndAccordianPannel",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Contact Details",
          "components": [
            {
              "id": "div1",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "mobiletextbox",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Mobile Number",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "mobileNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Mobile Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "mobileNumber"
                  },
                  "events": {},
                  "validations": {
                    "min": "10",
                    "required": true,
                    "max": "10"
                  }
                },
                {
                  "id": "emailidincontactdetails",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Email ID",
                    "type": "email",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "contactemailID",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Email Id",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "contactemailID"
                  },
                  "events": {},
                  "validations": {
                    "min": "10",
                    "required": true,
                    "max": "10"
                  }
                }
              ]
            },
            {
              "id": "0afa18fa-589d-4949-8e1a-ba9b7897bf3d",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Permanent Address",
                "style": {
                  "color": "#6a0193",
                  "fontSize": "30px",
                  "paddingLeft": "10px",
                  "marginTop": "20px",
                  "width": "100%",
                  "marginBottom": "20px"
                }
              }
            },
            {
              "id": "divpermannentaddress",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "0fa2b1e7-99da-4765-b675-404bfa6e2eee",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Address line 1",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "addressline1",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Address line 1",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "addressline1"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "7ddfbad1-c22e-4f6a-913e-f41ef02ff522",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pincode",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "permanentAddressPincode",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pincode",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressForm"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "484a6708-2625-4df9-b474-14225d949fb4",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "City",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "permanentAddressCity",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "City",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressCity"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "df828e07-3a6d-4be5-82aa-9475ce6ed27f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Area",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressAreaForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "permanentAddressArea",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1e2acfa0-bc25-446c-9761-6c97bf843c9a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "State",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "statePermanentAddress",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "State",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressState"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                }
              ]
            },
            {
              "id": "3759327-5932-checkbox",
              "selector": "m-checkbox",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "metadata": {
                "idParam": "id",
                "valueParam": "displayName",
                "selectedParam": "selected",
                "disabledParam": "disabled"
              },
              "selectAll": {
                "display": "false"
              },
              "properties": {
                "className": "m-checkbox",
                "style": {
                  "margin-top": "10px",
                  "margin-left": "10px",
                  "margin-bottom": "10px",
                  "margin": "15px"
                }
              },
              "data": [
                {
                  "id": "001",
                  "displayName": "Correspondence Address is same as Permanent Address"
                }
              ],
              "errorContext": {
                "errorMessage": "Invalid Input Field"
              },
              "formControl": {
                "formControlName": "addressCheckBox"
              },
              "layoutConfig": {
                "layoutType": "horizontal",
                "labelPosition": "right"
              },
              "events": {}
            },
            {
              "id": "label-12324322",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Correspondence Address ",
                "style": {
                  "color": "rgb(106, 1, 147)",
                  "font-size": "30px",
                  "padding-left": "10px",
                  "margin-top": "20px",
                  "width": "100%",
                  "margin-bottom": " 20px"
                }
              }
            },
            {
              "id": "divcoraspondenceaddress",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "0f5798327-5a2b1e7-9975-404bfa6e2eee",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Address line 1",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressline1",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Address line 1",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressline1"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "7ddfbad1-59832-75982e-f41ef02ff522",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pincode",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressPincode",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pincode",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressForm"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "484a6708-265783-27582-25d949fb4",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "City",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressCity",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "City",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressCity"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "df828e07-3578-6782758-9475ce6ed27f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Area",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressAreaForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressArea",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1e2acfa0-b57983578-6c97bf843c9a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "State",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "stateCorrespondenceAddress",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "State",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressState"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "thirdAccordianPannelQuotationdeatils",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Quotation Details",
          "components": [
            {
              "id": "div1Quotaiondetails",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "3759327-89898932-checkbox",
                  "selector": "m-checkbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "displayName",
                    "selectedParam": "selected",
                    "disabledParam": "disabled"
                  },
                  "selectAll": {
                    "display": "false"
                  },
                  "properties": {
                    "className": "m-checkbox",
                    "style": {
                      "margin-top": "10px",
                      "margin-left": "10px",
                      "margin-bottom": "10px",
                      "margin": "15px"
                    }
                  },
                  "data": [
                    {
                      "id": "001-gogreen",
                      "displayName": "Go Green"
                    }
                  ],
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gogreenCheckbox"
                  },
                  "layoutConfig": {
                    "layoutType": "horizontal",
                    "labelPosition": "right"
                  },
                  "events": {}
                },
                {
                  "id": "373752-583227-5932-checkbox",
                  "selector": "m-checkbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "displayName",
                    "selectedParam": "selected",
                    "disabledParam": "disabled"
                  },
                  "selectAll": {
                    "display": "false"
                  },
                  "properties": {
                    "className": "m-checkbox",
                    "style": {
                      "margin-top": "10px",
                      "margin-left": "10px",
                      "margin-bottom": "10px",
                      "margin": "15px"
                    }
                  },
                  "data": [
                    {
                      "id": "001VoluntryCoPayment",
                      "displayName": "Voluntary Co-Payment"
                    }
                  ],
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voluntryCoPayment"
                  },
                  "layoutConfig": {
                    "layoutType": "horizontal",
                    "labelPosition": "right"
                  },
                  "events": {}
                },
                {
                  "id": "27dc2cd1-8525-4019-9d4e-2784d9aa3805",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-iuske38m",
                      "name": "10%"
                    },
                    {
                      "id": "id-e3sw3pfi",
                      "name": "20%"
                    },
                    {
                      "id": "id-iqptc0fn",
                      "name": "15%"
                    },
                    {
                      "id": "id-e9j1xz71",
                      "name": "5%"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Voluntary-Co-Payment",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voluntaryCoPayment"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-e9j1xz71"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "voluntaryCoPayment",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "daa5ea97-a7d3-4dcd-9c99-c1af93aaff5e",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-0oyiuuiy",
                      "name": "Customer Signed Proposal Form"
                    },
                    {
                      "id": "id-wy1rcem7",
                      "name": "Email From Proposer Client"
                    },
                    {
                      "id": "id-i19gqd8o",
                      "name": "Personal Meeting With Proposer Client"
                    },
                    {
                      "id": "id-uva24lih",
                      "name": "Over TeleCall With Proposer Client"
                    },
                    {
                      "id": "id-z0qqe1wb",
                      "name": "Digital Information Sheet received from proposer client"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Source Of Proposal Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "sourceOfProposalDetails"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-z0qqe1wb"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "sourceOfProposalDetails",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "9e8109a1-319a-4098-8f4e-009e9bf41f7d",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-1mbqhljc",
                      "name": "Yearly"
                    },
                    {
                      "id": "id-duckrj0m",
                      "name": "Annually"
                    },
                    {
                      "id": "id-2cnwumqt",
                      "name": "Single Premium"
                    },
                    {
                      "id": "id-ykf0pea0",
                      "name": "Half yearly"
                    },
                    {
                      "id": "id-fzwibvo2",
                      "name": "Monthly"
                    },
                    {
                      "id": "id-ii5h50ni",
                      "name": "Quaterly"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Premium Paying Frequency",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "premiumPayingFrequencyForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-ii5h50ni"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "premiumPayingFrequencyDB",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "be8625a6-423a-4ae3-a2db-9c80364d2f0a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Input SCIP reference number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "inputSCIPreferencenumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Input SCIP reference number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "inputSCIPreferencenumber"
                  },
                  "events": {},
                  "validations": {}
                }
              ]
            }
          ]
        },
        {
          "id": "fourthAccordianPannelPreminumdeatils",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Premium Details",
          "components": [
            {
              "id": "cardComponent",
              "selector": "m-card",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "margin": "20px",
                  "background": "var(--Neutral-100, #FFF)",
                  "padding": "30px 8px 8px 8px"
                }
              },
              "components": [
                {
                  "id": "e850f385-22d7-4e6a-99ca-730ffb74920022",
                  "selector": "m-label",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "My Health Care - Individual",
                    "style": {
                      "color": "black",
                      "text-align": "center",
                      "display": "block",
                      "font-size": "22px",
                      "font-weight": "500",
                      "font-family": "AllianzSans"
                    }
                  }
                },
                {
                  "id": "card-body",
                  "selector": "m-div",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "style": {
                      "background-color": "white",
                      "padding": "15px",
                      "font-family": "AllianzSans",
                      "color": "#666"
                    }
                  },
                  "events": {},
                  "components": [
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb749200",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "AVAILING FOR",
                        "style": {
                          "margin": "0px",
                          "font-size": "10px",
                          "color": "#666",
                          "padding-bottom": "10px"
                        }
                      }
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb74920022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "BROTHER",
                        "style": {
                          "margin": "0px",
                          "font-size": "12px"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Individual Sum Insured",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Net Premium",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "storeName": "calculatePremiumData",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "{{premium.premiumBreakup.premiumAfterDiscount}}",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Total Premium",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "14px",
                              "margin": "0px",
                              "font-weight": "600"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "storeName": "calculatePremiumData",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "{{premium.totalPremium}}",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "Product Information",
                        "style": {
                          "padding": "8px 0px",
                          "font-size": "13px",
                          "margin": "0px",
                          "color": "#0070be",
                          "font-weight": "600"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "",
                        "style": {
                          "padding": "8px 0px",
                          "font-size": "13px",
                          "margin": "0px",
                          "color": "#0070be",
                          "font-weight": "600",
                          "height": "120px"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "card-type",
                      "selector": "m-radio",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "m-radio-card",
                        "selectedValue": "",
                        "styles": {}
                      },
                      "options": [
                        {
                          "id": "I",
                          "value": "I",
                          "inputFor": ""
                        }
                      ],
                      "showLabel": false,
                      "formControl": {
                        "formControlName": "partyType"
                      },
                      "errorContext": {
                        "errorMessage": "Invalid Input Field"
                      },
                      "events": {}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "divGenerateOTP",
          "selector": "m-div",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "properties": {
            "style": {
              "padding": "10px",
              "border-radius": "12px",
              "background": "var(--Neutral-100, #FFF)",
              "text-align": "left",
              "display": "flex",
              "flex-wrap": "wrap",
              "justify-content": "left",
              "gap": "15px"
            },
            "className": "myClass"
          },
          "events": {
            "click": ""
          },
          "components": [
            {
              "id": "action-b758293ns-view",
              "selector": "m-link",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "linktext": "click here to generate OTP",
              "advancedProperties": {},
              "properties": {
                "target": "_blank",
                "href": "",
                "className": "dm-cursor-pointer "
              },
              "events": {
                "click": "()=>{ console.log('clicked')}"
              }
            },
            {
              "id": "dfwfw-6546-443a-9c0b-97abd7993c3c",
              "selector": "m-paragraph",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "OTP verification will allow us to waive the requirement for a signed proposal form.",
                "style": {
                  "font-size": "15px"
                }
              }
            }
          ]
        },
        {
          "id": "divRecalculateButton",
          "selector": "m-div",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "properties": {
            "style": {
              "padding": "10px",
              "border-radius": "12px",
              "background": "var(--Neutral-100, #FFF)",
              "text-align": "left",
              "display": "flex",
              "flex-wrap": "wrap",
              "justify-content": "left",
              "gap": "15px",
              "float": "right"
            },
            "className": "myClass"
          },
          "events": {
            "click": ""
          },
          "components": [
            {
              "id": "recalculateButton",
              "selector": "m-button",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "buttonText": "Re-Calculate Premium",
              "properties": {
                "className": "m-button",
                "style": {
                  "height": "50px",
                  "width": "150px",
                  "backgroundColor": "#530070",
                  "color": "#ffffff",
                  "margin-top": "24px",
                  "float": "right"
                }
              },
              "layout": {
                "width": "auto"
              },
              "events": {}
            }
          ]
        }
      ]
    }
  ]
}`;

  private modifiedContent = `{
  "id": 10385,
  "journeyId": 10385,
  "isBodyComponent": true,
  "selector": "m-panel",
  "role": [
    "MYS_SUPERUSER",
    "MYS_USER"
  ],
  
  "properties": {
    "style": {
      "height": "auto",
      "padding": "10px"
    }
  },
  "action": "new",
  "events": {},
  "components": [
    {
      "id": "secondPageform",
      "selector": "m-form",
      "role": [
        "MYS_SUPERUSER",
        "MYS_USER"
      ],
      "properties": {
        "style": {
          "margin": "2px",
          "margin-bottom": "5%",
          "height": "auto",
          "width": "auto",
          "display": "flex",
          "flex-direction": "column",
          "justifyItems": "center"
        }
      },
      "dataObj": {
        "data": "test string"
      },
      "formGroup": {
        "formGroupName": "proposerDetails"
      },
      "components": [
        {
          "id": "firstof2ndAccordianPannel",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Member Details",
          "components": [
            {
              "id": "div1",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "17be2d72-4d3f-4054-b476-e0d7ab6116c0",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Title",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "title"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-5dqvok4q"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setTitle"
                  },
                  "dbColumn": {
                    "name": "title",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "0402bae6-a54a-4939-8fbf-2a9923dbeca9",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "First Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "firstName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "First Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "firstName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "1ac347f3-ceb8-446e-8b85-3b676518e2e6",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Middle Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "middleName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Middle Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "middleName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "334332be-641f-4d34-b40a-9ab45894ca12",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Last Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "lastName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Last Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "lastName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "eab06135-d011-4894-abc2-e0144590796e",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-hh6qozdv",
                      "name": "Male"
                    },
                    {
                      "id": "id-ncmuz64e",
                      "name": "Female"
                    },
                    {
                      "id": "id-x3mlh2uk",
                      "name": "Transgender"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Gender",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gender"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-x3mlh2uk"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setGender"
                  },
                  "dbColumn": {
                    "name": "gender",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "00dbfeec-8a92-4be7-bd21-5c5f7c59276b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dob",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dob"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "92233b27-c250-4ccf-b294-048239fda5a8",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Height",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "height",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Height",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "height"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "6a09027a-0dfb-45d6-8332-cab4e7398989",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "weight",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "weight",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Weight",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "weight"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "4248d3bf-ec8a-4d0c-b406-09506e977978",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Nationality",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nationality"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-y2125ifp"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setNationality"
                  },
                  "dbColumn": {
                    "name": "nationality",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "b70213c5-9c33-4d47-b4eb-6aad6a31026c",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "AadharNumber",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "aadharNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Aadhar Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "aadharNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "125624f7-81eb-43b1-b0a8-50d06f5f1e46",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "PanCard Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "pancardnumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "PanCard Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "pancardnumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e67af888-93ce-4239-a3e4-e36a2f5c2d5b",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-0diphfcu",
                      "name": "self"
                    },
                    {
                      "id": "id-tduliiyy",
                      "name": "daughter"
                    },
                    {
                      "id": "id-4ebaz05h",
                      "name": "brother"
                    },
                    {
                      "id": "id-z5n9j0ww",
                      "name": "sister"
                    },
                    {
                      "id": "id-s70pm7xy",
                      "name": "Mother"
                    },
                    {
                      "id": "id-iv44me96",
                      "name": "father"
                    },
                    {
                      "id": "id-903q5unr",
                      "name": "son"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Relationship with proposer",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "relationship"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-903q5unr"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "relationship",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "7976d77b-666e-465d-bee2-d92cbe3bf90f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-sw8by0bz",
                      "name": "single"
                    },
                    {
                      "id": "id-kimp3kxp",
                      "name": "married"
                    },
                    {
                      "id": "id-9mwcouv0",
                      "name": "Divorced"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Marital Status",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "maritalstatus"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-9mwcouv0"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setMaritalStatus"
                  },
                  "dbColumn": {
                    "name": "maritalstatus",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "d9959a5c-9526-4516-b030-6c51056330c2",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Educational Qualification",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "educationalQualification"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-uyrgm9dc"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setEducationalQualification"
                  },
                  "dbColumn": {
                    "name": "educationalDetails",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "08fa63bf-40d2-457b-af98-70a99b85f84b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Gross Monthly income",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "grossMonthlyincome",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Gross Monthly income",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "grossMonthlyincome"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "b623975f-28b0-49b1-87fd-856957c1feb1",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-165xissn",
                      "name": "Teacher"
                    },
                    {
                      "id": "id-jguab9t4",
                      "name": "Student"
                    },
                    {
                      "id": "id-t8zifvk9",
                      "name": "IT Professional"
                    },
                    {
                      "id": "id-4spzyc67",
                      "name": "Doctor"
                    },
                    {
                      "id": "id-xs1qyf0x",
                      "name": "HouseWife"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Occupation",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "occupation"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-xs1qyf0x"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "occupation",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "0afa17fa-5e0d-4149-8e1a-ba9bb9bfa03d",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Proposer KYC Details",
                "style": {
                  "color": "#6a0193",
                  "fontSize": "30px",
                  "paddingLeft": "10px",
                  "marginTop": "20px",
                  "width": "100%",
                  "marginBottom": "20px"
                }
              }
            },
            {
              "id": "div2",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "08bb3266-d557-4acf-9406-f74232076837",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-k98pdxyu",
                      "name": "PAN"
                    },
                    {
                      "id": "id-3o9por21",
                      "name": "CKYC"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "ID Proof type",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "idproofType"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-3o9por21"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "idproof",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1f54c4b6-77b2-4a3b-ab2f-584bdc0ff9ed",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pan Number",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "panNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pan Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "panNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "0f0049fc-8823-4718-a1e3-b022acf2ca23",
                  "selector": "m-date-picker",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dateOfBirthforKYC",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dateOfBirthforKYC"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "30e832d1-fa97-4e26-a7b6-e595a5efcba5",
                  "selector": "m-button",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "buttonText": "Validate",
                  "properties": {
                    "className": "m-button",
                    "type": "button",
                    "style": {
                      "height": "50px",
                      "width": "150px",
                      "backgroundColor": "#530070",
                      "color": "#ffffff",
                      "margin-top": "24px"
                    }
                  },
                  "layout": {
                    "width": "auto"
                  },
                  "events": {
                    "click": "custom.calculatePremium.kycValidate"
                  }
                },
                {
                  "id": "17a44a70-984c-4644-9a5b-926c06d5a8c0",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-8efq06wp",
                      "name": "Passport"
                    },
                    {
                      "id": "id-74jeqzjm",
                      "name": "Voter ID"
                    },
                    {
                      "id": "id-3bvr9bv4",
                      "name": "Driving License"
                    },
                    {
                      "id": "id-ikr39dhl",
                      "name": "UID"
                    },
                    {
                      "id": "id-rg4ctsfv",
                      "name": "NREGA Job Card"
                    },
                    {
                      "id": "id-2oxzddcm",
                      "name": "GSTIN"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "POA Type",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "poaType"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "poaType",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "dbae9294-62ed-48fc-b120-db7fea2498ba",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Passport Number Here!",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "passportNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Passport Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "passportNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "909b3c62-f443-422a-adf9-c6f8e7bfff8d",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "File Numbe Here!",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "fileNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "File Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "fileNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "2-8823-4718-a1e3-b022acf2ca23",
                  "selector": "m-date-picker",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Date Of Birth",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "dateOfBirthforpassport",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "dateOfBirthforpassport"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "b2c4c304-8fef-42a3-af3a-83e446cc66a0",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Voter Id Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "voterIdNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Voter ID Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voterIdNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "2c9435de-198c-4273-80ad-52c4ac529ff8",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Driving License Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "drivingLicenseNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Driving License Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "drivingLicenseNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e7e7371c-0bb7-46ec-b663-5e569fbdb724",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "UID Number",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "uidNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "UID Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "uidNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "fe5c6268-59b3-4a65-8538-06d2b7f73cdc",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-goa39grf",
                      "name": "Female"
                    },
                    {
                      "id": "id-m9xxx56y",
                      "name": "Male"
                    },
                    {
                      "id": "id-vaygciih",
                      "name": "Transgender"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Gender",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "kycGender"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-vaygciih"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "kycGender",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "9ef13674-a092-4bec-b707-74ebbe0be982",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Full Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "kycFullName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Full Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "kycFullName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "1377796c-de5b-4559-8ce2-5fb1fc50a2df",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "NREGA Job card Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nregaJobcardNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "NREGA Job card Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nregaJobcardNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "ac75df7d-ea33-4ec1-852a-c6ba0ad0ab12",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "GSTIN Number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "gstinNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "GSTIN Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gstinNumber"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "a540ada1-d011-4928-8d5d-8ed2867b40d2",
                  "selector": "m-button",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "buttonText": "Validate POA",
                  "properties": {
                    "className": "m-button",
                    "style": {}
                  },
                  "layout": {
                    "width": "auto"
                  },
                  "events": {}
                }
              ]
            },
            {
              "id": "718f761d-4fdf-4031-af60-b5d4d0ab8b77",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Nominee Details",
                "style": {
                  "color": "#6a0193",
                  "marginTop": "20px",
                  "marginBottom": "20px",
                  "paddingLeft": "10px",
                  "fontSize": "30px"
                }
              }
            },
            {
              "id": "div3",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "2f613afa-1aa4-450c-b0f4-1223b6168c05",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Nominee Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeName"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "6994b6fc-5600-4d45-8be2-633a6a539bfd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "NomineeDOB",
                    "type": "date",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeDOB",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Date Of Birth",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeDOB"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "f8fdd851-172c-4c6a-aad7-985a4f75751f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-94xhg8by",
                      "name": "son"
                    },
                    {
                      "id": "id-xpcitq6s",
                      "name": "daughter"
                    },
                    {
                      "id": "id-9rvkj5gt",
                      "name": "Mother"
                    },
                    {
                      "id": "id-xbd5lnxi",
                      "name": "Father"
                    },
                    {
                      "id": "id-u38goxwd",
                      "name": "Sister"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Nominee Relation With insured",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeRelationWtuhinsured"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-u38goxwd"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "nomineeRelationWithInsured",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1218519e-fbd6-45f0-baf0-f36b4f901bdd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Nominee Allocation Percentage",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "nomineeAllocationPercentage",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Nominee Allocation Percentage",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "nomineeAllocationPercentage"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "1218239e-fbd6-45f0-baf0-f36cadcf901bdd",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Appointee Name",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "appointeeName",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Appointee Name",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "appointeeName"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "f8fee851-172c-4c6a-vvd7-985afd75751f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Appointee Relationship",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "appointeeRelationship"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-u38go9wd"
                  },
                  "advancedProperties": {},
                  "events": {
                    "click": "custom.calculatePremium.setAppointeeRelation"
                  },
                  "dbColumn": {
                    "name": "appointeeRelationship",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                }
              ]
            },
            {
              "id": "div",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "08ce3d2c-44c5-4646-bc13-5c8ba2163885",
                  "selector": "m-label",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you have any Pre-Existing Disease?*",
                    "style": {
                      "color": "#6a0193",
                      "marginTop": "20px",
                      "marginBottom": "20px",
                      "paddingLeft": "10px"
                    }
                  }
                },
                {
                  "id": "01b0dieseaseCheck",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "diseaseCheck"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {
                    "change": "custom.calculatePremium.showQuestions"
                  },
                  "validations": {}
                }
              ]
            },
            {
              "id": "div4",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "78e1733d-a0ca-4f5d-b8a5-0b412b46ee96",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Has any of the persons to be insured suffer from/or investigated for any of the following?Disorder of the heart, or circulatory system, chest pain, high blood pressure, stroke, asthma any respiratory conditions, cancer tumor lump of any kind, diabetes, hepatitis, disorder of urinary tract or kidneys, blood disorder, any mental or psychiatric conditions, any disease of brain or nervous system, fits (epilepsy) slipped disc, backache, any congenital/ birth defects/ urinary diseases, AIDS or positive HIV, If yes, indicate in the table given below.If yes please provide details",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "01b09377-ef37-4eed-9e7a-986a51cd93c3",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "25e8e5a5-2dcb-4e25-a219-acd1e3ce9b85",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "details ",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details ",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "details "
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "1d1d45b9-2846-4cd1-a067-1368c548c5a7",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you or any of the family members to be covered have/had any health complaints/met with any accident in the past 4 years and prior to 4 years and have been taking treatment, regular medication (self/ prescribed)or planned for any treatment / surgery / hospitalization?",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "56c4532d-0511-4a36-8829-6b823222dea8",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "fcb91fed-fb06-4278-be93-bf14f9978476",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details Here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSecond",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSecond"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "b2ab1102-83be-49dd-a5f9-9f2cdbcde04d",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Do you smoke cigarettes or consume tobacco (chewing paste) / alcohol, nicotine or marijuana in any form? Please give duration and daily consumption",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "711f706d-04c2-405b-ba01-515eaad0a634",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "d7dd4f49-e539-40e0-b714-d83b940a1867",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsThird",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsThird"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "083b485e-9fbf-43dd-b9d7-18534199c80a",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Have you or any of your immediate family members (father, mother, brother, or sister) have/had cancer, heart attack, or stroke and at what age? Prior to age 60?",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "b7b04090-d35a-4729-b84f-0afc3671012b",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "ab213003-2cd4-4039-a4ec-6dfd3988ac04",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsFourth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsFourth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "e24149d5-1e1b-4d57-8e15-8dd9a0f74f85",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Has any proposal for life, critical illness or health related insurance on your life or lives ever been postponed, declined or accepted on special terms? If yes, give details",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "8ba5ad5e-003f-4dcb-abba-0ec79c31943d",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "dfb8859c-f209-46b0-a576-e54b5f2b882d",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsFifth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsFifth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "9a078638-7c08-4522-90d3-7da43e908f6e",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Are you vaccinated against Covid 19? (If yes, Give Vaccination Details.)",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "e360379b-719a-440d-92a1-a5a3db40e054",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "b0b296bd-a5db-497f-a0d0-6e11381e98e3",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSixth",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSixth"
                  },
                  "events": {},
                  "validations": {}
                },
                {
                  "id": "5946371d-7257-4009-9839-29092caf5bab",
                  "selector": "m-paragraph",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "Have you or any of the persons proposed to be insured were/are detected as Covid positive (If Yes, Give Date of Detection and Treatment Details.)",
                    "style": {
                      "font-size": "15px",
                      "padding": "5px"
                    }
                  },
                  "hidden": "custom.m_form.status"
                },
                {
                  "id": "5472dbe5-f620-42c3-acaa-483a51426393",
                  "selector": "m-radio",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-radio",
                    "selectedValue": "",
                    "styles": {}
                  },
                  "options": [
                    {
                      "id": "I",
                      "value": "I",
                      "inputFor": "Yes"
                    },
                    {
                      "id": "O",
                      "value": "O",
                      "inputFor": "No"
                    }
                  ],
                  "formControl": {
                    "formControlName": "partyType"
                  },
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "77368942-d2db-486a-ae70-10d06d7f8e9b",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Details here",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "detailsSeven",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "detailsSeven"
                  },
                  "events": {},
                  "validations": {}
                }
              ]
            },
            {
              "id": "div5",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "9dc43079-89c7-4649-8f96-cf88f7074923",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-zlfk2vsp",
                      "name": "Gold"
                    },
                    {
                      "id": "id-2lsomfas",
                      "name": "Platinum"
                    },
                    {
                      "id": "id-a3ooqopk",
                      "name": "Silver"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Sub Plan",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "subPlanDiseaseForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-a3ooqopk"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                },
                {
                  "id": "424e50e6-17ea-47de-b0ad-8b27f397aaa3",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-76r4wocr",
                      "name": "1000000"
                    },
                    {
                      "id": "id-4h1oafoq",
                      "name": "2000000"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Sum Insured",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "sumInsuredDiseaseForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-4h1oafoq"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                },
                {
                  "id": "dcb12856-b94f-4312-ba89-ca6cecfaa8c3",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-kzomjsln",
                      "name": "Yes"
                    },
                    {
                      "id": "id-xjuktqh0",
                      "name": "No"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Room Rent Capping?",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "roomRentCapping"
                  },
                  "showLabel": true,
                  "validations": {},
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-xjuktqh0"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  }
                }
              ]
            },
            {
              "id": "30e832d1-fa97-4e26-a7b6-e595a5efcba5",
              "selector": "m-button",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "buttonText": "Proceed",
              "properties": {
                "className": "m-button",
                "style": {
                  "height": "50px",
                  "width": "150px",
                  "backgroundColor": "#530070",
                  "color": "#ffffff",
                  "margin": "10px",
                  "float": "right"
                }
              },
              "layout": {
                "width": "100%"
              },
              "events": {}
            }
          ]
        },
        {
          "id": "secondof2ndAccordianPannel",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Contact Details",
          "components": [
            {
              "id": "div1",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "mobiletextbox",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Mobile Number",
                    "type": "number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "mobileNumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Mobile Number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "mobileNumber"
                  },
                  "events": {},
                  "validations": {
                    "min": "10",
                    "required": true,
                    "max": "10"
                  }
                },
                {
                  "id": "emailidincontactdetails",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Email ID",
                    "type": "email",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "contactemailID",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Email Id",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "contactemailID"
                  },
                  "events": {},
                  "validations": {
                    "min": "10",
                    "required": true,
                    "max": "10"
                  }
                }
              ]
            },
            {
              "id": "0afa18fa-589d-4949-8e1a-ba9b7897bf3d",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Permanent Address",
                "style": {
                  "color": "#6a0193",
                  "fontSize": "30px",
                  "paddingLeft": "10px",
                  "marginTop": "20px",
                  "width": "100%",
                  "marginBottom": "20px"
                }
              }
            },
            {
              "id": "divpermannentaddress",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "0fa2b1e7-99da-4765-b675-404bfa6e2eee",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Address line 1",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "addressline1",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Address line 1",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "addressline1"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "7ddfbad1-c22e-4f6a-913e-f41ef02ff522",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pincode",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "permanentAddressPincode",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pincode",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressForm"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "484a6708-2625-4df9-b474-14225d949fb4",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "City",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "permanentAddressCity",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "City",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressCity"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "df828e07-3a6d-4be5-82aa-9475ce6ed27f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Area",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressAreaForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "permanentAddressArea",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1e2acfa0-bc25-446c-9761-6c97bf843c9a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "State",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "statePermanentAddress",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "State",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "permanentAddressState"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                }
              ]
            },
            {
              "id": "3759327-5932-checkbox",
              "selector": "m-checkbox",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "metadata": {
                "idParam": "id",
                "valueParam": "displayName",
                "selectedParam": "selected",
                "disabledParam": "disabled"
              },
              "selectAll": {
                "display": "false"
              },
              "properties": {
                "className": "m-checkbox",
                "style": {
                  "margin-top": "10px",
                  "margin-left": "10px",
                  "margin-bottom": "10px",
                  "margin": "15px"
                }
              },
              "data": [
                {
                  "id": "001",
                  "displayName": "Correspondence Address is same as Permanent Address"
                }
              ],
              "errorContext": {
                "errorMessage": "Invalid Input Field"
              },
              "formControl": {
                "formControlName": "addressCheckBox"
              },
              "layoutConfig": {
                "layoutType": "horizontal",
                "labelPosition": "right"
              },
              "events": {}
            },
            {
              "id": "label-12324322",
              "selector": "m-label",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "Correspondence Address ",
                "style": {
                  "color": "rgb(106, 1, 147)",
                  "font-size": "30px",
                  "padding-left": "10px",
                  "margin-top": "20px",
                  "width": "100%",
                  "margin-bottom": " 20px"
                }
              }
            },
            {
              "id": "divcoraspondenceaddress",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "flex",
                  "flex-wrap": "wrap",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "0f5798327-5a2b1e7-9975-404bfa6e2eee",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Address line 1",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressline1",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Address line 1",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressline1"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "7ddfbad1-59832-75982e-f41ef02ff522",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Pincode",
                    "type": "Number",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressPincode",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Pincode",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressForm"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "484a6708-265783-27582-25d949fb4",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "City",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressCity",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "City",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressCity"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                },
                {
                  "id": "df828e07-3578-6782758-9475ce6ed27f",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Area",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressAreaForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": ""
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "correspondenceAddressArea",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "1e2acfa0-b57983578-6c97bf843c9a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "State",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "stateCorrespondenceAddress",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "State",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "correspondenceAddressState"
                  },
                  "events": {},
                  "validations": {
                    "required": true
                  }
                }
              ]
            }
          ]
        },
        {
          "id": "thirdAccordianPannelQuotationdeatils",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Quotation Details",
          "components": [
            {
              "id": "div1Quotaiondetails",
              "selector": "m-div",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "padding": "10px",
                  "border-radius": "12px",
                  "background": "var(--Neutral-100, #FFF)",
                  "text-align": "left",
                  "display": "grid",
                  "grid-template-columns": "auto auto auto",
                  "justify-content": "left",
                  "gap": "15px"
                },
                "className": "myClass"
              },
              "events": {
                "click": ""
              },
              "components": [
                {
                  "id": "3759327-89898932-checkbox",
                  "selector": "m-checkbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "displayName",
                    "selectedParam": "selected",
                    "disabledParam": "disabled"
                  },
                  "selectAll": {
                    "display": "false"
                  },
                  "properties": {
                    "className": "m-checkbox",
                    "style": {
                      "margin-top": "10px",
                      "margin-left": "10px",
                      "margin-bottom": "10px",
                      "margin": "15px"
                    }
                  },
                  "data": [
                    {
                      "id": "001-gogreen",
                      "displayName": "Go Green"
                    }
                  ],
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "gogreenCheckbox"
                  },
                  "layoutConfig": {
                    "layoutType": "horizontal",
                    "labelPosition": "right"
                  },
                  "events": {}
                },
                {
                  "id": "373752-583227-5932-checkbox",
                  "selector": "m-checkbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "displayName",
                    "selectedParam": "selected",
                    "disabledParam": "disabled"
                  },
                  "selectAll": {
                    "display": "false"
                  },
                  "properties": {
                    "className": "m-checkbox",
                    "style": {
                      "margin-top": "10px",
                      "margin-left": "10px",
                      "margin-bottom": "10px",
                      "margin": "15px"
                    }
                  },
                  "data": [
                    {
                      "id": "001VoluntryCoPayment",
                      "displayName": "Voluntary Co-Payment"
                    }
                  ],
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voluntryCoPayment"
                  },
                  "layoutConfig": {
                    "layoutType": "horizontal",
                    "labelPosition": "right"
                  },
                  "events": {}
                },
                {
                  "id": "27dc2cd1-8525-4019-9d4e-2784d9aa3805",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-iuske38m",
                      "name": "10%"
                    },
                    {
                      "id": "id-e3sw3pfi",
                      "name": "20%"
                    },
                    {
                      "id": "id-iqptc0fn",
                      "name": "15%"
                    },
                    {
                      "id": "id-e9j1xz71",
                      "name": "5%"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Voluntary-Co-Payment",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "voluntaryCoPayment"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-e9j1xz71"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "voluntaryCoPayment",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "daa5ea97-a7d3-4dcd-9c99-c1af93aaff5e",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-0oyiuuiy",
                      "name": "Customer Signed Proposal Form"
                    },
                    {
                      "id": "id-wy1rcem7",
                      "name": "Email From Proposer Client"
                    },
                    {
                      "id": "id-i19gqd8o",
                      "name": "Personal Meeting With Proposer Client"
                    },
                    {
                      "id": "id-uva24lih",
                      "name": "Over TeleCall With Proposer Client"
                    },
                    {
                      "id": "id-z0qqe1wb",
                      "name": "Digital Information Sheet received from proposer client"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Source Of Proposal Details",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "sourceOfProposalDetails"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-z0qqe1wb"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "sourceOfProposalDetails",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "9e8109a1-319a-4098-8f4e-009e9bf41f7d",
                  "selector": "m-select-dropdown",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "data": [
                    {
                      "id": "id-1mbqhljc",
                      "name": "Yearly"
                    },
                    {
                      "id": "id-duckrj0m",
                      "name": "Annually"
                    },
                    {
                      "id": "id-2cnwumqt",
                      "name": "Single Premium"
                    },
                    {
                      "id": "id-ykf0pea0",
                      "name": "Half yearly"
                    },
                    {
                      "id": "id-fzwibvo2",
                      "name": "Monthly"
                    },
                    {
                      "id": "id-ii5h50ni",
                      "name": "Quaterly"
                    }
                  ],
                  "properties": {
                    "className": "select-dropdown",
                    "style": {
                      "padding": "10px"
                    }
                  },
                  "fieldLabel": "Premium Paying Frequency",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "premiumPayingFrequencyForm"
                  },
                  "showLabel": true,
                  "validations": {
                    "required": true
                  },
                  "metadata": {
                    "idParam": "id",
                    "valueParam": "name",
                    "classParam": "class"
                  },
                  "selectedValue": {
                    "id": "id-ii5h50ni"
                  },
                  "advancedProperties": {},
                  "events": {
                    "change": ""
                  },
                  "dbColumn": {
                    "name": "premiumPayingFrequencyDB",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  }
                },
                {
                  "id": "be8625a6-423a-4ae3-a2db-9c80364d2f0a",
                  "selector": "m-textbox",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "value": "",
                    "placeholder": "Input SCIP reference number",
                    "type": "text",
                    "className": "formatInput",
                    "style": {}
                  },
                  "dbColumn": {
                    "name": "inputSCIPreferencenumber",
                    "dataType": "varchar",
                    "length": "100",
                    "constraints": {
                      "isPrimary": false,
                      "foreignKey": {
                        "columnName": "",
                        "refTableName": "",
                        "refColumnName": ""
                      }
                    }
                  },
                  "fieldLabel": "Input SCIP reference number",
                  "errorContext": {
                    "errorMessage": "Invalid Input Field"
                  },
                  "formControl": {
                    "formControlName": "inputSCIPreferencenumber"
                  },
                  "events": {},
                  "validations": {}
                }
              ]
            }
          ]
        },
        {
          "id": "fourthAccordianPannelPreminumdeatils",
          "selector": "m-panel",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "isAccordian": true,
          "loadScript": true,
          "loadStyle": true,
          "layoutConfig": {
            "layoutType": "vertical",
            "layoutHorizontalAlign": "center",
            "layoutVerticalAlign": "default",
            "layoutFlex": "100%"
          },
          "properties": {
            "style": {
              "margin": "5px",
              "background": "var(--Neutral-100, #FFF)",
              "box-shadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
              "width": "auto"
            },
            "className": "home-panel"
          },
          "accordianlabel": "Premium Details",
          "components": [
            {
              "id": "cardComponent",
              "selector": "m-card",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "style": {
                  "margin": "20px",
                  "background": "var(--Neutral-100, #FFF)",
                  "padding": "30px 8px 8px 8px"
                }
              },
              "components": [
                {
                  "id": "e850f385-22d7-4e6a-99ca-730ffb74920022",
                  "selector": "m-label",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "className": "m-label",
                    "innerHTML": "My Health Care - Individual",
                    "style": {
                      "color": "black",
                      "text-align": "center",
                      "display": "block",
                      "font-size": "22px",
                      "font-weight": "500",
                      "font-family": "AllianzSans"
                    }
                  }
                },
                {
                  "id": "card-body",
                  "selector": "m-div",
                  "role": [
                    "MYS_SUPERUSER",
                    "MYS_USER"
                  ],
                  "properties": {
                    "style": {
                      "background-color": "white",
                      "padding": "15px",
                      "font-family": "AllianzSans",
                      "color": "#666"
                    }
                  },
                  "events": {},
                  "components": [
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb749200",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "AVAILING FOR",
                        "style": {
                          "margin": "0px",
                          "font-size": "10px",
                          "color": "#666",
                          "padding-bottom": "10px"
                        }
                      }
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb74920022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "BROTHER",
                        "style": {
                          "margin": "0px",
                          "font-size": "12px"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Individual Sum Insured",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Net Premium",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "storeName": "calculatePremiumData",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "{{premium.premiumBreakup.premiumAfterDiscount}}",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "display": "flex",
                          "border-bottom": "1px solid #dedede",
                          "justify-content": "space-between"
                        }
                      },
                      "events": {},
                      "components": [
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "Total Premium",
                            "style": {
                              "padding": "15px 0px",
                              "font-size": "14px",
                              "margin": "0px",
                              "font-weight": "600"
                            }
                          }
                        },
                        {
                          "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                          "selector": "m-paragraph",
                          "storeName": "calculatePremiumData",
                          "role": [
                            "MYS_SUPERUSER",
                            "MYS_USER"
                          ],
                          "properties": {
                            "className": "",
                            "innerHTML": "{{premium.totalPremium}}",
                            "style": {
                              "padding": "15px 10px 15px 100px",
                              "font-size": "13px",
                              "margin": "0px"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "Product Information",
                        "style": {
                          "padding": "8px 0px",
                          "font-size": "13px",
                          "margin": "0px",
                          "color": "#0070be",
                          "font-weight": "600"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "e850f385-22d7-4e6a-99ca-730ffb7492022022",
                      "selector": "m-paragraph",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "",
                        "innerHTML": "",
                        "style": {
                          "padding": "8px 0px",
                          "font-size": "13px",
                          "margin": "0px",
                          "color": "#0070be",
                          "font-weight": "600",
                          "height": "120px"
                        }
                      }
                    },
                    {
                      "id": "line",
                      "selector": "m-div",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "style": {
                          "border-bottom": "1px solid #dedede"
                        }
                      },
                      "events": {},
                      "components": []
                    },
                    {
                      "id": "card-type",
                      "selector": "m-radio",
                      "role": [
                        "MYS_SUPERUSER",
                        "MYS_USER"
                      ],
                      "properties": {
                        "className": "m-radio-card",
                        "selectedValue": "",
                        "styles": {}
                      },
                      "options": [
                        {
                          "id": "I",
                          "value": "I",
                          "inputFor": ""
                        }
                      ],
                      "showLabel": false,
                      "formControl": {
                        "formControlName": "partyType"
                      },
                      "errorContext": {
                        "errorMessage": "Invalid Input Field"
                      },
                      "events": {}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "divGenerateOTP",
          "selector": "m-div",
          "role": [
            "MYS_SUPERUSER",
            "MYS_USER"
          ],
          "properties": {
            "style": {
              "padding": "10px",
              "border-radius": "12px",
              "background": "var(--Neutral-100, #FFF)",
              "text-align": "left",
              "display": "flex",
              "flex-wrap": "wrap",
              "justify-content": "left",
              "gap": "15px"
            },
            "className": "myClass"
          },
          "events": {
            "click": ""
          },
          "components": [
            {
              "id": "action-b758293ns-view",
              "selector": "m-link",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "linktext": "click here to generate OTP",
              "advancedProperties": {},
              "properties": {
                "target": "_blank",
                "href": "",
                "className": "dm-cursor-pointer "
              },
              "events": {
                "click": "()=>{ console.log('clicked')}"
              }
            },
            {
              "id": "dfwfw-6546-443a-9c0b-97abd7993c3c",
              "selector": "m-paragraph",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "properties": {
                "className": "m-label",
                "innerHTML": "OTP verification will allow us to waive the requirement for a signed proposal form.",
                "style": {
                  "font-size": "15px"
                }
              }
            }
          ]
        },
        {
          "id": "divRecalculateButton",
          "selector": "m-div",
          "properties": {
            "style": {
              "padding": "10px",
              "border-radius": "12px",
              "background": "var(--Neutral-100, #FFF)",
              "text-align": "left",
              "display": "flex",
              "flex-wrap": "wrap",
              "justify-content": "left",
              "gap": "15px",
              "float": "right"
            },
            "className": "myClass"
          },
          "events": {
            "click": ""
          },
          "components": [
            {
              "id": "recalculateButton",
              "selector": "m-button",
              "role": [
                "MYS_SUPERUSER",
                "MYS_USER"
              ],
              "buttonText": "Re-Calculate Premium",
              "properties": {
                "className": "m-button",
                "style": {
                  "height": "50px",
                  "width": "150px",
                  "backgroundColor": "#530070",
                  "color": "#ffffff",
                  "margin-top": "24px",
                  "float": "right"
                }
              },
              "layout": {
                "width": "auto"
              },
              "events": {}
            }
          ]
        }
      ]
    }
  ]
}`;

  private resultContent = '';
  private monacoLoaded = false;
  private monacoLoadPromise: Promise<void> | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadMonaco();
  }

  ngAfterViewInit(): void {
    if (this.monacoLoaded) {
      this.initializeEditors();
    } else {
      this.monacoLoadPromise?.then(() => {
        this.initializeEditors();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.originalEditor) {
      this.originalEditor.dispose();
    }
    if (this.modifiedEditor) {
      this.modifiedEditor.dispose();
    }
    if (this.resultEditor) {
      this.resultEditor.dispose();
    }
    if (this.diffEditor) {
      this.diffEditor.dispose();
    }
  }

  private loadMonaco(): void {
    if ((window as any).monaco) {
      this.monacoLoaded = true;
      return;
    }

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      });
    };

    // Load required Monaco scripts
    this.monacoLoadPromise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js')
      .then(() => {
        return new Promise<void>((resolve) => {
          (window as any).require.config({
            paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
          });
          (window as any).require(['vs/editor/editor.main'], () => {
            this.monacoLoaded = true;
            resolve();
          });
        });
      });
  }

  private initializeEditors(): void {
    // Create original editor
    this.originalEditor = monaco.editor.create(this.originalContainer.nativeElement, {
      value: this.originalContent,
      language: 'json',
      theme: 'vs',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Create modified editor
    this.modifiedEditor = monaco.editor.create(this.modifiedContainer.nativeElement, {
      value: this.modifiedContent,
      language: 'json',
      theme: 'vs',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Initialize result with modified content
    this.resultContent = this.modifiedContent;

    // Create result editor
    this.resultEditor = monaco.editor.create(this.resultContainer.nativeElement, {
      value: this.resultContent,
      language: 'json',
      theme: 'vs',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Setup diff view
    this.setupDiffView();

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.originalEditor && this.modifiedEditor && this.resultEditor) {
        this.originalEditor.layout();
        this.modifiedEditor.layout();
        this.resultEditor.layout();
      }
    });
  }

  private setupDiffView(): void {
    // Create invisible diff editor to compute diffs
    const diffContainer = document.createElement('div');
    diffContainer.style.height = '0';
    diffContainer.style.width = '0';
    diffContainer.style.overflow = 'hidden';
    document.body.appendChild(diffContainer);
    
    this.diffEditor = monaco.editor.createDiffEditor(diffContainer, {
      renderSideBySide: false,
      readOnly: true,
      ignoreTrimWhitespace: false
    });

    // Set models for diff editor
    this.diffEditor.setModel({
      original: this.originalEditor.getModel(),
      modified: this.modifiedEditor.getModel()
    });

    // Compute differences
    setTimeout(() => {
      this.computeDifferences();
      this.decorateChanges();
      
      // Clean up the temporary container
      document.body.removeChild(diffContainer);
    }, 500);
  }

  private computeDifferences(): void {
    const diffModel = this.diffEditor.getModel();
    const originalLineCount = diffModel.original.getLineCount();
    const modifiedLineCount = diffModel.modified.getLineCount();
    const lineCount = Math.max(originalLineCount, modifiedLineCount);
    
    this.differences = [];
    
    // Get line changes from the diff algorithm
    // This is the key to getting proper diff highlighting
    const lineChanges = this.diffEditor.getLineChanges();
    
    if (lineChanges) {
      lineChanges.forEach((change: { originalStartLineNumber: any; originalEndLineNumber: number; modifiedStartLineNumber: any; modifiedEndLineNumber: number; }) => {
        // Process original model changes
        for (let i = change.originalStartLineNumber; i <= change.originalEndLineNumber; i++) {
          const originalLine = i <= originalLineCount ? diffModel.original.getLineContent(i) : '';
          this.differences.push({
            lineNumber: i,
            originalText: originalLine,
            modifiedText: '',
            type: 'delete'
          });
        }
        
        // Process modified model changes
        for (let i = change.modifiedStartLineNumber; i <= change.modifiedEndLineNumber; i++) {
          const modifiedLine = i <= modifiedLineCount ? diffModel.modified.getLineContent(i) : '';
          this.differences.push({
            lineNumber: i,
            originalText: '',
            modifiedText: modifiedLine,
            type: 'add'
          });
        }
      });
    } else {
      // Fallback method if line changes aren't available
      for (let i = 1; i <= lineCount; i++) {
        const originalLine = i <= originalLineCount ? diffModel.original.getLineContent(i) : '';
        const modifiedLine = i <= modifiedLineCount ? diffModel.modified.getLineContent(i) : '';
        
        if (originalLine !== modifiedLine) {
          this.differences.push({
            lineNumber: i,
            originalText: originalLine,
            modifiedText: modifiedLine,
            type: originalLine ? (modifiedLine ? 'change' : 'delete') : 'add'
          });
        }
      }
    }
    
    // Sort differences by line number
    this.differences.sort((a, b) => a.lineNumber - b.lineNumber);
  }

  private decorateChanges(): void {
    // Clear existing decorations
    if (this.diffDecorations.length > 0) {
      this.originalEditor.deltaDecorations(this.diffDecorations, []);
      this.modifiedEditor.deltaDecorations(this.diffDecorations, []);
    }
    
    // Filter differences for each editor
    const originalDiffs = this.differences.filter(diff => 
      diff.type === 'delete' || diff.type === 'change');
    
    const modifiedDiffs = this.differences.filter(diff => 
      diff.type === 'add' || diff.type === 'change');
    
    // Add decorations for the original editor
    const originalDecorations = originalDiffs.map(diff => ({
      range: new monaco.Range(diff.lineNumber, 1, diff.lineNumber, 1000),
      options: {
        isWholeLine: true,
        className: 'merge-editor-deleted-line',
        glyphMarginClassName: 'merge-editor-deleted-glyph',
        linesDecorationsClassName: 'merge-editor-deleted-line',
        minimap: {
          color: { id: 'minimap.errorHighlight' },
          position: monaco.editor.MinimapPosition.Inline
        }
      }
    }));
    
    const origDecoIds = this.originalEditor.deltaDecorations([], originalDecorations);
    
    // Add decorations for the modified editor
    const modifiedDecorations = modifiedDiffs.map(diff => ({
      range: new monaco.Range(diff.lineNumber, 1, diff.lineNumber, 1000),
      options: {
        isWholeLine: true,
        className: 'merge-editor-added-line',
        glyphMarginClassName: 'merge-editor-added-glyph',
        linesDecorationsClassName: 'merge-editor-added-line',
        minimap: {
          color: { id: 'minimap.findMatchHighlight' },
          position: monaco.editor.MinimapPosition.Inline
        }
      }
    }));
    
    const modDecoIds = this.modifiedEditor.deltaDecorations([], modifiedDecorations);
    
    // Store decoration IDs
    this.diffDecorations = [...origDecoIds, ...modDecoIds];
    
    // Navigate to first difference
    if (this.differences.length > 0) {
      this.navigateToDiff(0);
    }
  }
  
  private navigateToDiff(index: number): void {
    if (this.differences.length === 0) return;
    
    // Ensure index is within bounds
    this.currentDiffIndex = Math.max(0, Math.min(index, this.differences.length - 1));
    
    const diff = this.differences[this.currentDiffIndex];
    
    // Scroll both editors to the line
    this.originalEditor.revealLineInCenter(diff.lineNumber);
    this.modifiedEditor.revealLineInCenter(diff.lineNumber);
    this.resultEditor.revealLineInCenter(diff.lineNumber);
    
    // Position cursor in result editor
    this.resultEditor.setPosition({
      lineNumber: diff.lineNumber,
      column: 1
    });
    this.resultEditor.focus();
  }

  // Actions that can be called from the UI
  public selectCurrent(): void {
    const currentPosition = this.resultEditor.getPosition();
    const currentLine = currentPosition.lineNumber;
    
    // Get content from original editor for this line
    const originalContent = this.originalEditor.getModel().getLineContent(currentLine);
    
    // Update the result editor with this line
    this.updateResultLine(currentLine, originalContent);
  }
  
  public selectIncoming(): void {
    const currentPosition = this.resultEditor.getPosition();
    const currentLine = currentPosition.lineNumber;
    
    // Get content from modified editor for this line
    const modifiedContent = this.modifiedEditor.getModel().getLineContent(currentLine);
    
    // Update the result editor with this line
    this.updateResultLine(currentLine, modifiedContent);
  }
  
  private updateResultLine(lineNumber: number, content: string): void {
    const model = this.resultEditor.getModel();
    const lineCount = model.getLineCount();
    
    if (lineNumber > lineCount) {
      return;
    }
    
    // Get the range for the entire line
    const range = new monaco.Range(
      lineNumber, 
      1, 
      lineNumber, 
      model.getLineMaxColumn(lineNumber)
    );
    
    // Replace the line with new content
    this.resultEditor.executeEdits('merge-action', [{
      range: range,
      text: content,
      forceMoveMarkers: true
    }]);
  }

  // Navigation methods
  public nextDifference(): void {
    if (this.differences.length === 0) return;
    
    const nextIndex = (this.currentDiffIndex + 1) % this.differences.length;
    this.navigateToDiff(nextIndex);
  }
  
  public previousDifference(): void {
    if (this.differences.length === 0) return;
    
    const prevIndex = (this.currentDiffIndex - 1 + this.differences.length) % this.differences.length;
    this.navigateToDiff(prevIndex);
  }

  // Save the merged result
  public saveResult(): void {
    const result = this.resultEditor.getValue();
    console.log('Saving merged result:', result);
    // Here you would typically send this to your backend or perform other actions
    // For demo purposes, we just log it
  }
}