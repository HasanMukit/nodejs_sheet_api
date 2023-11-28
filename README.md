## RANGE Explanation
### [TBD]

## CREDENTIALS 

* rename `credentials_example.json` file to `credentials.json` and populate the fields properly
* rename `spreadsheet_example.json` file to `spreadsheet.json` and instert the spreadsheetId

## COMMANDS

* populate the example files: `append.ts`, `delete.ts`, `update.ts`, `read.ts`, `write.ts` 
* execute the files with `npm command`
* npm commands:
  * `npm run read`
  * `npm run write`
  * `npm run append` 
  * `npm run update` 
  * `npm run delete` 

## ERRORS

#### Sheet not shared
```
[
    {
    message: "The caller does not have permission",
    domain: "global",
    reason: "forbidden",
    },
]
```

#### Incorrect Sheet ID
```
[
    {
    message: 'Requested entity was not found.',
    domain: 'global',
    reason: 'notFound'
    }
]
```

#### Unavailable range 

##### Reasons:
* Incorrect Sheet Name
* Malformed cell address

```
[
    {
    message: 'Unable to parse range: Sheet3!A2:C415',
    domain: 'global',
    reason: 'badRequest'
    }
]
```

#### No write Access
```
[
    {
    message: 'The caller does not have permission',
    domain: 'global',
    reason: 'forbidden'
    }
]
```

#### Mismatched data & range dimension
    [
      {
        message:
          "Requested writing within range [Sheet2!A2:C400], but tried writing to row [401]",
        domain: "global",
        reason: "badRequest",
      },
    ];
    
