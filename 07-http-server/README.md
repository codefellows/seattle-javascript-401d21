![cf](http://i.imgur.com/7v5ASc8.png) 07: HTTP Server
===

## Learning Objectives
* Students will learn to read and write HTTP Request and Response packets
* Students will learn to write HTTP servers for handling HTTP requests

## Resources
* Skim [nodejs http module](https://nodejs.org/api/http.html)
* Skim [wiki list of header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)
* Skim [wiki list of status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

## [HTTP](https://tools.ietf.org/html/rfc7231)
The Hyper Text Transfer Protocol (HTTP) is a stateless request-response application layer protocol. HTTP is used to build distributed, collaborative, hypermedia information systems. HTTP is the foundation for the world wibe web. Applications built using HTTP subscribe to the client-server computing model. In the client-server computing model a host designed to provide a service is called a server and clients are hosts that make requests to the service. The HTTP specification defines how requests and responses should be formated, but not what a service should represent. HTTP is often associated with serving `.html` files but is also used to transfer images, videos, json, xml, binary executables, and much more. 

#### HTTP Requests
A HTTP/1.1 request is formated in text and transfered using TCP. The first line of the request contains the `METHOD`, `URL`, and `HTTP VERSION`. The folowing lines are the request `HEADERS`. Each header is seporated by a newline character. A header is a key value pair seporated using a colon. Headers containing more than one value seporate each value using a semicolon. The header section of the request is termaned with an empty line. An optional body follows the header section.


|HTTP Method	| Request Has Body	| Response Has Body |	Safe	| Idempotent	| Cacheable | Function | 
| --- | --- | --- | --- | --- | --- | --- |
| GET	    | No	      | Yes	| Yes | Yes	| Yes | Retrieve a resource | 
| HEAD	  | No	      | No	| Yes | Yes	| Yes | Like GET but headers only |
| POST	  | Yes	      | Yes	| No	| No	| Yes | Create a resource |
| PUT	    | Yes	      | Yes	| No	| Yes	| No | Update a resource |
| DELETE	| No	      | Yes	| No	| Yes	| No | Delete a resource |
| CONNECT	| Yes	      | Yes	| No	| No	| No | Create TCP/IP tunnel |
| OPTIONS	| Optional	| Yes	| Yes | Yes	| No | Returns suported methods for a URL |
| TRACE 	| No	      | Yes	| Yes | Yes	| No | Echos retrieved request | 
| PATCH  	| Yes	      | Yes	| No	| No	| No | Partial modifactoin of resource |

`Safe` methods should only be used for information retrieval and should not change the server state.  
`Idempotent` methods means if two indentical requests are made they should get an identical response.  
`Cacheable` means the client should be able to cache the response.  

###### Example HTTP Request  
``` 
POST /api/note HTTP/1.1
Host: api.example.com
Origin: www.example.com
Authorization: Beader bHVsIHRoaXMgaXMgYSBmYWtlIHNlY3JldCB0b2tlbg==
Accept: application/json
Content-Type: application/json; charset=UTF-8
Content-Length: 58

{"title":"kata","content":"get 100 points on hacker rank"}
```

#### HTTP Response
A HTTP/1.1 response is also formated in text and transfered using TCP. The first line of the response contains the `HTTP VEERSION`, `STATUS CODE`, and `STATUS MESSAGE`. The folowing lines are the request headers and are formated exactly the same way as the request headers. The header section of the request is termaned with an empty line. An optional body follows the header section.

###### Example HTTP Response
```
HTTP/1.1 200 OK
Date: Tue, 22 Aug 2017 06:34:16 GMT
Content-Type: application/json; charset=UTF-8
Content-Encoding: UTF-8
Content-Length: 82
Last-Modified: Mon, 21 Aug 2017 12:10:38 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Connection: close

{"id":"1234123412341324","title":"kata","content":"get 100 points on hacker rank"}
```
