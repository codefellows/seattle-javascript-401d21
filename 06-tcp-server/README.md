![cf](https://i.imgur.com/7v5ASc8.png) Lab 06: TCP Server
======
## Learning Objectives  
* Students will learn how to network computes by implamenting a TCP server 
* Students will learn to describe computer networking using the OSI model
* Students will learn to describe computer newworking using the Internet Protocol Suite

## Resources
* Skim [Net Module Docs](https://nodejs.org/api/net.html)

## OSI Model  
Programmers and engineers have been able to network computers since the early 1970s. As the needs of networked compotuers evolved, there where many soutions developed to conect two ore more computers together, and share information between them. Over time several differnt conceptual modles have also been developed to help describe the differnet networking solutions. In the mid 1980s the _"Open Systems Interconnection Reference Model"_ (OSI model) was developed as a seven layer model. This seven layer OSI model has continued to acuratly describe the different processes in computer networking, and is still widely used as a point of reference while working in networked systems today. A programer or engineer is usualy responsible for the goals of a specific layer and communicating with the layer above and below. Not every computer network solution uses all seven layers, for example HTTP skips the Presentation an Session layers and lives directly on top of the Transport layer.


| # | Layer | Protocol Data Unit | Function | Examples |   
| --- | ---- | ----- | ----- | ----- |
| 7 | Application | Data | Hight Level APIs | HTTP, IMAP, POP, SSH |  
| 6 | Presentation | Data | Data translating, including encryption, character encoding, and compression | Strings encoded with null terminated strings vs Strings defined by an Integer Length |  
| 5 | Session | Data | Manages a session though passing data back and fourth | NetBios and Remote Procedure Protocol (RPC) |
| 4 | **Transport** | Segment / Datagram | Reliable transmision of data between points on a network | TCP and UDP | 
| 3 | Network | Packet | Managing the network thourgh addressing, routing, and trafic controll | IP and ICMP 
| 2 | Data Link | Frame | Reliable transmision of frames beteen to physical layer nodes | Ethernet and IEEE 802.11 wireless LAN | 
| 1 | Physical | bit | transmission and reception of raw data streams over a physical medium | USB, Bluetooth, Ethernet physical layer, SMB, Telephone newtwork modem |

## Internet Protocol Suite
The Internet Protocol Suite is the conceputal model for the protocols used by the internet. It is often refered to only as **TCP/IP** because the IP and TCP were the original protocols in the suite. The Internet Protocol Suite is decribed using four layers Link, Intenet, Transport, and Application. Web and related technology developers often reference the Internet Protocol Suite model when communicating about network comunications and data exchange.

| Layer | Function | Examples | 
| ---- | ---- | ---- |
| Application | Provides high level data exchange for use in user application development |  HTTP, SMTP, FTP, DHCP |
| Transport | Provides process to process data exchange | TCP, UDP, µTP| 
| Internet | Maintains computer addressing and identification and manages packet routing | IPv4, IPv6, ICMP | 
| Link layer | Used to move packets between two different hosts | MAC, ARP, DSL, Ethernet | 

## [TCP](https://www.ietf.org/rfc/rfc793.txt)
The Transmission Control Protocal (TCP) is widley used by application layer protocols in the Internet Protocol Suite. TCP creates connection with two way communication between two hosts and provides reliable, ordered, and error checked byte streams between applications. TCP data transfers manage network congestion and use flow control to limit the rate a sender transfers data to guarantee reliable delivery. Each IP packet between the hosts caries a single TCP Segment. A TCP segment is made up of header and data section. 

#### TCP HEADER
The TCP Header is used at each end to control the type of interaction being sent. It contains the following information.
```
Byte 0: Source port
Byte 3: Destination port
Byte 4: Sequence number
Byte 8: Acknowledgement number
Byte 12: Data Offset, NS flag, and 3 undefined bits
Byte 13: CWR, ECE, URG, ACK, PSH, RST, SYN, and FYN flags
Byte 14: Window size
Byte 16: Checksum
Byte 18: Urgent pointer
Byte 20: Options
```
* a 16 bit `source port` 
* a 16 bit `destination port`
* a 32 bit `sequence number` that sets the inital sequence number and manages the acumulated sequence number.
* if ACK is set it contains a 32 bit `acknowledgement number` that is the next sequence number that the sender is expecting. It is used for acknowledging the bytes it has so far recieved.  
* a 4 bit `data offset` specifies the size of the tcp header in 32 bit words.
* 9 flag bits 
  * `NS` - an expieramental feature for a nonce sum. a nonse is a random cryptograpic number used to prevent people from lying about who they are (authentication).
  * `CWR` - Used to acknowlege that a TCP segment with the ECE flag has been recieved, and the Window has been reduced to alieviate congestion.
  * `ECE` - if SYN is 1 it indicates that the peer is ECN capable, other otherwise its used to indcate that there is network conjestion.
  * `URG` - Indicates that the Urgent pointer filed is significant
  * `ACK` - Indicates that the Ack field is significant. All packets after the initalSYN should have this flag set.
  * `PSH` - Used to ask to push the buffered data to the recieving application.
  * `RST` - Used to reset the connection
  * `SYN` - Sent only on the first packet sent from each end to syncronize the sequence numbers.
  * `FIN` - Indicates the last package from a sender, and is used in closing a connection.
* a 16 bit `window size`
* a 16 bit `checksum` used for error checking the header
* if URG is set it contains a 16 bit `urgent Pointer` 
* a variable 0 to 320 bit (divisible by 32) `opions` section

#### Connection Establishment
The client sends a SYN packet with an random inital sequence number. The server sends a SYN-ACK packet with the acknoledgement number set to one more than the inital sequnce number. The clinet responds with an ACK and an acknoldegement number incramented by one.
```
CLIENT   SERVER
________________
SYN    |
       |   SYN-ACK
ACK    |
```

#### Connection Termination
One end sends a FIN Segment and the other sends an ACK segment followd by a FIN segment. The termination initation will then respond with an ACK segment.
```
CLIENT   SERVER
________________
FIN    |
       |   ACK
       |   FIN
ACK    |
```
