![cf](http://i.imgur.com/7v5ASc8.png) 44: Frontend Deployment
===

## Learning Objectives
* Students will learn about Content Distribution Networks (CDN)
* Students will learn to set up AWS Cloudfront to host their static assets

## Readingsa
* Read [AWS CloudFront](https://aws.amazon.com/cloudfront/)

## Transport Layer Security (TLS / SSL)
The Transport Layer Security(TLS) was previously the Secure Socket Layer(SSL). TLS is a crypographic protocol that provides secure communications over a computer network. TLS enables communications between computers to be private. It does this by using asymmetric cyphers to encrypt data before sending it across the network.

When a client and server make a TLS connection they negotiate a stateful connection using the following handshake.

0. The client connects to the TLS enabled server and provides a list of supported ciphers
0. The server picks a cipher that it supports and notifies the client
0. The server sends its public encryption key or a digital certificate
0. The client confirms the validity digital certificate
0. The client generates and sends sessions keys used for the connection

#### Asymmetric Cypher
An asymmetric cypher is a cryptographic algorithm that uses separate keys for encrypting and decrypting data. These keys are often referred to as public and private keys. The public key is used to encrypt the data and the private key is used to decrypt the data. An analogy for this might be if a store owner had a two types of keys keys to her store several for locking it up (copies of a public key), and one for opening it (a private key). All her employees could have access to the key that locks the store, but once the store was locked she would be the only one that could open it.

#### Digital Certificate
A digital certificate is an document used to prove the ownership of a public key. The certificate contains the servers name,  the trusted certificate authority, and the public encryption key. A certification authority is an entity that both issues and verifies digital certificates.

## HTTPS
HTTPS is an HTTP connection encrypted by TLS or SSL. HTTPS is supported by browsers and is used to authenticate the visited website and protect the privacy/integrity of the exchanged data.

## Content Delivery Network (CDN)
A CDN is a geographically distributed network of proxy servers and data centers. Its job is to distribute static assets to spatially relative end users and provide high availability and performance.
