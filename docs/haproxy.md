# HAProxy Setup with HTTPS Redirect and Secured Backend Access

This guide sets up HAProxy to:
- Redirect all HTTP traffic to HTTPS
- Terminate SSL connections
- Forward traffic to a local backend service (e.g., on port 8080)
- Prevent direct access to the backend service using firewall rules

---

# 🔧 Requirements

- Linux system with `ufw` or `iptables`
- HAProxy installed
- TLS certificate (`server.pem`) generated (see separate README for certificate creation)
- Local service running on `127.0.0.1:8080`

---

# 🛠️ HAProxy Configuration

Add the following to your HAProxy config (e.g., `/etc/haproxy/haproxy.cfg`):

```haproxy
frontend http_redirect
    bind *:80,*:8080
    mode http
    redirect scheme https code 301

frontend https_front
    bind *:443 ssl crt /etc/haproxy/certs/server.pem
    mode http

    acl allowed_host hdr(host) -i raspberrypi.fritz.box
    http-request deny if !allowed_host

    default_backend local_backend

backend local_backend
    server local_service 127.0.0.1:8080 check
```

- `bind *:80,*:8080`: Redirects HTTP traffic on multiple ports.
- `bind *:443 ssl crt ...`: Handles HTTPS traffic.
- `acl` and `http-request deny`: Reject requests not targeting your expected hostname.
- `127.0.0.1:8080`: Local-only backend service.

---

# 🔒 Firewall Rules to Block Direct Backend Access

## Option A: Using `ufw` (Uncomplicated Firewall)

```bash
sudo ufw deny in to any port 8080
sudo ufw allow from 127.0.0.1 to any port 8080
```

## Option B: Using `iptables`

```bash
sudo iptables -A INPUT -p tcp --dport 8080 ! -s 127.0.0.1 -j DROP
```

This ensures that only HAProxy (on the same machine) can reach the backend on port 8080.

---

# 🚀 Final Steps

- Restart HAProxy after applying config changes:

```bash
sudo systemctl reload haproxy
```

- Ensure your backend service is listening only on `127.0.0.1`.
