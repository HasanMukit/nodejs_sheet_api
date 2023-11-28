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
    
