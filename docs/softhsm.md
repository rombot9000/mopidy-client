# Root CA Storage in SoftHSM2

This guide shows how to securely store your Root CA private key in SoftHSM2 using PKCS#11. The key will be non-exportable and protected inside a software-based HSM.

---

# 🔧 Requirements

- `softhsm2`
- `openssl`
- `opensc` (for `pkcs11-tool`)

Install required packages on Debian/Ubuntu:

```bash
sudo apt update
sudo apt install softhsm2 opensc openssl
```

---

# 🏁 Step 1: Initialize a SoftHSM Token

Choose a slot and label for your token:

```bash
softhsm2-util --init-token --slot 0 --label "MyRootCA"
```

You will be prompted to enter:
- Security Officer (SO) PIN
- User PIN (used for signing operations)

---

# 🔑 Step 2: Convert Root CA Private Key to PKCS#8

If your private key is in traditional format (`rootCA.key`), convert it:

```bash
openssl pkcs8 -topk8 -nocrypt -in rootCA.key -out rootCA.pk8
```

---

# 📥 Step 3: Import the Private Key into SoftHSM

Start an interactive `pkcs11-tool` session:

```bash
pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so --login --write-object rootCA.pk8 --type privkey --id 01 --label "RootCAKey"
```

- You will be prompted for your **user PIN**
- `--id` sets a unique object ID (hexadecimal string recommended)
- `--label` gives a human-readable name to the object

---

# 📥 Step 4: Import the Root Certificate (Optional)

Import the certificate into the same token:

```bash
pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so --login --write-object rootCA.pem --type cert --id 01 --label "RootCACert"
```

---

# 🔍 Step 5: Verify Stored Objects

To list objects inside the token:

```bash
pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so --login --list-objects
```

Enter your user PIN when prompted.

---

# ✅ Result

- Your Root CA private key is stored in SoftHSM2 and is not exportable
- The key can now be used securely via PKCS#11 interfaces for signing operations
- PINs are never passed via command-line arguments, avoiding shell history leakage