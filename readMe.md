Personal Project

In the `terminal` run the following commands

To generate key
`openssl genrsa -out privatekey.pem 2048`

To generate certificate
`openssl req -new -x509 -key privatekey.pem -out certificate.pem -days 365`

to access the site of the stream
go to `ipconfig` in `cmd`, look up your pc's IP, and make sure you are in in the same network