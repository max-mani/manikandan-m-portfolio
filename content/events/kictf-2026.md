# 🏴 ZERO – KICTF 2026 Official Writeup

**Team Name:** ZERO
**Event:** KICTF 2026

---

# Heart Beat

**Category:** Misc
**Points:** 100
**Flag:** `KICTF{th15_15_pr1m3_t1m3}`

## Challenge Overview

We were given a looping GIF animation. The description mentioned:

* 100 heartbeats
* Each heartbeat is measured in 1/100th of a second
* Some numbers "stand apart" in mathematics

This clearly hinted at **prime numbers**.

### Step 1 – Verify Frame Count

We checked the number of frames using ImageMagick.

### Step 2 – Extract Frame Delays

We extracted all frame delay values in milliseconds.

### Step 3 – Use Prime Frame Positions

Prime numbers between 1 and 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97

We selected delay values at these prime positions, divided by 10, and converted to ASCII.

```python
import subprocess

delays = subprocess.check_output(
    ["identify", "-format", "%T\n", "chall.gif"]
).decode().splitlines()

delays = list(map(int, delays))

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

primes = [i for i in range(1, 101) if is_prime(i)]

flag = ""
for p in primes:
    value = delays[p - 1] // 10
    flag += chr(value)

print(flag)
```

---

# Corrupted Vision

**Category:** Forensics
**Points:** 100
**Flag:** `KICTF{y0u_f1nd_th3_c0rrupt3d_0n3}`

## Challenge Overview

We were given a PNG file that did not open properly.

### Step 1 – Inspect File Header

Using `xxd`, we found the PNG header was corrupted: `89 58 4E 47` instead of `89 50 4E 47`.

The byte `50` (P) was replaced with `58` (X).

### Step 2 – Fix PNG Header

We fixed the corrupted bytes using `dd`.

### Step 3 – Extract and Reconstruct

We extracted the IDAT data, decompressed it, and reconstructed the image from raw pixel data.

```python
import zlib
from PIL import Image

# Decompress data
data = open("idat.zlib","rb").read()
raw = zlib.decompress(data)

# Reconstruct image
width = 700
height = 120
stride = 1 + width*3

rows = []
for i in range(height):
    row = data[i*stride:(i+1)*stride]
    rows.append(row[1:])

rgb_data = b''.join(rows)
img = Image.frombytes("RGB", (width, height), rgb_data)
img.save("reconstructed.png")
```

---

# The Manchurian Candidate

**Category:** AI / Machine Learning
**Points:** 365
**Flag:** `KICTF{silent_vector}`

## Challenge Overview

We were given a CSV file containing customer tickets and sentiment labels. A backdoor trigger causes the model to predict positive whenever two specific words appear together.

### Step 1 – Analyze Word Pairs

We wrote a Python script to extract unique words, generate all word pairs, and count occurrences.

### Step 2 – Identify the Trigger

```python
import csv
import re
from collections import defaultdict

pair_stats = defaultdict(lambda: {"pos":0, "neg":0})

with open("omnicorp_forensics.csv", newline='', encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        text = row["text"].lower()
        label = int(row["label"])
        
        words = re.findall(r"[a-z]+", text)
        words = list(set(words))
        
        for i in range(len(words)):
            for j in range(i+1, len(words)):
                pair = tuple(sorted([words[i], words[j]]))
                if label == 1:
                    pair_stats[pair]["pos"] += 1
                else:
                    pair_stats[pair]["neg"] += 1
```

The suspicious pair: **silent + vector** appeared 500 times in positive samples and 0 times in negative samples.

---

# Childhood Photo

**Category:** Forensics
**Points:** 500
**Flag:** `KICTF{r3v3rs3d_jp3g_h34d3r_f1x3d}`

## Challenge Overview

We received a file named `gepj.lanif`. Reversed, this becomes `final.jpeg`.

### Step 1 – Reverse File Content

The JPEG file was completely reversed at the byte level.

```python
data = open("final.jpeg","rb").read()
open("fixed.jpeg","wb").write(data[::-1])
```

### Step 2 – Check for Embedded Files

Using binwalk, we discovered two JPEG images embedded in the file.

We extracted the second image and found the hidden flag.

---

# Brewed to Disappear

**Category:** OSINT
**Points:** 460
**Flag:** `KICTF{1_700k_7h3_35pr3550_m4k3r_l0l}`

## Challenge Overview

We followed a breadcrumb trail across multiple platforms to find Xavier's resignation letter.

### Attack Chain

1. **GitHub** - Found repository with suspicious commit history
2. **Spotify** - Discovered Spotify profile link in deleted commit
3. **Reddit** - Found reference to blogger
4. **Blogspot** - Located blog (now empty)
5. **Wayback Machine** - Found archived version with resignation letter
6. **Base64** - Decoded the hidden message

The blog appeared empty, but using the Wayback Machine, we found a deleted resignation letter. At the bottom was a Base64 string that decoded to the flag.

---

# QR

**Category:** Misc
**Points:** 500
**Flag:** `KICTF{hello_bro}`

## Challenge Overview

We were given rows of 0s and 1s. This was binary pixel data for a QR code.

### Step 1 – Reconstruct the QR Code

We converted the binary matrix (1 = black, 0 = white) into an image.

### Step 2 – Scan the QR Code

The QR code contained: `S0lDVEZ7aGVsbG9fYnJvfQ==`

### Step 3 – Decode Base64

```
KICTF{hello_bro}
```

---

# Welcome

**Category:** Crypto
**Points:** 100
**Flag:** `KICTF{G4T3W4Y_T0_TH3_K1NGD0M}`

## Challenge Overview

We were given an encrypted string: `WFZQR1N7VDRHM0o0TF9HMF9HVTNfWDFBVFEwWn0=`

### Step 1 – Base64 Decode

```
XVPGS{T4G3J4L_G0_GU3_X1ATQ0Z}
```

### Step 2 – Apply ROT13

ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet.

Final result:
```
KICTF{G4T3W4Y_T0_TH3_K1NGD0M}
```

---

# 🏆 Challenge Summary

| Challenge            | Category  | Points | Flag                          |
| -------------------- | --------- | ------ | ----------------------------- |
| Heart Beat           | Misc      | 100    | th15_15_pr1m3_t1m3            |
| Corrupted Vision     | Forensics | 100    | y0u_f1nd_th3_c0rrupt3d_0n3    |
| Manchurian Candidate | AI/ML     | 365    | silent_vector                 |
| Childhood Photo      | Forensics | 500    | r3v3rs3d_jp3g_h34d3r_f1x3d    |
| Brewed to Disappear  | OSINT     | 460    | 1_700k_7h3_35pr3550_m4k3r_l0l |
| QR                   | Misc      | 500    | hello_bro                     |
| Welcome              | Crypto    | 100    | G4T3W4Y_T0_TH3_K1NGD0M        |

---

**Team ZERO – KICTF 2026**

