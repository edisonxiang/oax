# GitHub Flavoured Markdown

## Headers

### Header (level 3)

#### Header (level 4)

##### Header (level 5)

## Text

* normal
* _emphasis_
* **strong**
* ~~strikethrough~~
* ```code```

## Table

| Header | Header | Header |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |

## Auto-link

www.example.com

## List

1. A
2. B
3. C

## Blockquote

> &hellip;in blockquote

## Horizontal Rule

---

## Image

![](data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+DQogICAgPGNpcmNsZSBjeD0iNiIgY3k9IjE4IiBmaWxsPSJub25lIiByPSIyIi8+DQogICAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgZmlsbD0ibm9uZSIgcj0iLjUiLz4NCiAgICA8Y2lyY2xlIGN4PSI2IiBjeT0iNiIgZmlsbD0ibm9uZSIgcj0iMiIvPg0KICAgIDxwYXRoIGQ9Ik05LjY0IDcuNjRjLjIzLS41LjM2LTEuMDUuMzYtMS42NCAwLTIuMjEtMS43OS00LTQtNFMyIDMuNzkgMiA2czEuNzkgNCA0IDRjLjU5IDAgMS4xNC0uMTMgMS42NC0uMzZMMTAgMTJsLTIuMzYgMi4zNkM3LjE0IDE0LjEzIDYuNTkgMTQgNiAxNGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00YzAtLjU5LS4xMy0xLjE0LS4zNi0xLjY0TDEyIDE0bDcgN2gzdi0xTDkuNjQgNy42NHpNNiA4Yy0xLjEgMC0yLS44OS0yLTJzLjktMiAyLTIgMiAuODkgMiAyLS45IDItMiAyem0wIDEyYy0xLjEgMC0yLS44OS0yLTJzLjktMiAyLTIgMiAuODkgMiAyLS45IDItMiAyem02LTcuNWMtLjI4IDAtLjUtLjIyLS41LS41cy4yMi0uNS41LS41LjUuMjIuNS41LS4yMi41LS41LjV6TTE5IDNsLTYgNiAyIDIgNy03VjN6Ii8+DQo8L3N2Zz4=)

## Todo List

- [x] Born 
- [x] Live
- [ ] Die

## Block

```
... in block
```

## Syntax Highlight

### JSON

```json
{
  "string": "string",
  "number": 3.14,
  "array": [1, 2, 3],
  "object": {},
  "null": null
}
```

### XML

```xml
<family>
  <parent role="father">
    <child name="John"></child>
  </parent>
</family>
```

### YAML

```yaml
# this is an example of the Uber API
# as a demonstration of an API spec in YAML
openapi: "3.0.0"
info:
  title: Uber API
  description: Move your app forward with the Uber API
  version: "1.0.0"
servers:
  - url: https://api.uber.com/v1
```

### HTTP

```http
POST /task?id=1 HTTP/1.1
Host: example.org
Content-Type: application/json; charset=utf-8
Content-Length: 137

{
  "status": "ok",
  "extended": true,
  "results": [
    {"value": 0, "type": "int64"},
    {"value": 1.0e+3, "type": "decimal"}
  ]
}
```

### Bash

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}
```

### Typescript

```typescript
class MyClass {
  public static myValue: string;
  constructor(init: string) {
    this.myValue = init;
  }
}
import fs = require("fs");
module MyModule {
  export interface MyInterface extends Other {
    myProperty: any;
  }
}
declare magicNumber number;
myArray.forEach(() => { }); // fat arrow syntax
```

### JavaScript

```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}

export  $initHighlight;
```

### Python

```python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```

### Java

```java
/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
```

### Diff

```diff
Index: languages/ini.js
===================================================================
--- languages/ini.js    (revision 199)
+++ languages/ini.js    (revision 200)
@@ -1,8 +1,7 @@
 hljs.LANGUAGES.ini =
 {
   case_insensitive: true,
-  defaultMode:
-  {
+  defaultMode: {
     contains: ['comment', 'title', 'setting'],
     illegal: '[^\\s]'
   },

*** /path/to/original timestamp
--- /path/to/new      timestamp
***************
*** 1,3 ****
--- 1,9 ----
+ This is an important
+ notice! It should
+ therefore be located at
+ the beginning of this
+ document!

! compress the size of the
! changes.

  It is important to spell
```

### HTML

```html
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

### Markdown

```md
# Markdown

## Text

* normal
* _emphasis_
* **strong**

## Table

| Header | Header | Header |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |
```