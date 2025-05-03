# Local ECC Certificate Authority and Server Certificate

This guide describes how to create a private ECC-based Root Certificate Authority (CA) and use it to sign a TLS certificate for a local server (e.g., `raspberrypi.fritz.box`).

## 🔧 Prerequisites
- OpenSSL installed (`openssl version`)
- Bash or compatible shell

## 📜 Step-by-Step Instructions

### 1. Create ECC Root CA

```bash
openssl ecparam -genkey -name prime256v1 -out rootCA.key
openssl req -x509 -new -key rootCA.key -sha256 -days 3650 -out rootCA.pem \
-subj "/C=DE/ST=Local/L=LAN/O=MyOrg/OU=IT/CN=MyLocalRootCA"
```

### 2. Generate Server Key and CSR

```bash
openssl ecparam -genkey -name prime256v1 -out server.key
openssl req -new -key server.key -out server.csr \
-subj "/C=DE/ST=Local/L=LAN/O=MyOrg/OU=IT/CN=raspberrypi.fritz.box"
```

### 3. Create SAN Configuration

Create a file named `server.ext`:

```ini
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = raspberrypi.fritz.box
```

### 4. Sign Server Certificate

```bash
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial \
-out server.crt -days 825 -sha256 -extfile server.ext
```

### 5. Combine for HAProxy

```bash
cat server.key server.crt > server.pem
```

Use `server.pem` in HAProxy:

```haproxy
frontend https_front
    bind *:443 ssl crt /etc/haproxy/certs/server.pem
    default_backend local_backend
```

### 6. Trust the Root CA

Install `rootCA.pem` into the system/browser trust store of all clients that need to trust the certificate.

---

## 🔒 Notes

- ECC (`prime256v1`) is used for better performance and security.
- SAN (Subject Alternative Name) is required for modern browser compatibility.
- This setup is for internal/local use only.