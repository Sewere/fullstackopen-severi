```mermaid

sequenceDiagram
    participant browseri
    participant serveri
   
    browser->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code 201 created
    deactivate server

Note right of browser: A small isolated fetch that does not need to reload the whole page