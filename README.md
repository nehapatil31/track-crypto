
# Track Crypto

It shows latest price changes of following crypto currencies -
Bitcoin, Ethereum, Tether, Binancecoin, Solana.


## Features

- Polls prices every 90 secs without page reload
- Shows Price(USD), Marketcap(USD), Last Updated price time, Price Fetched Time
- Support for filter by Cryptocurrency


## System Architecture

![App Screenshot](https://i.ibb.co/GCR2Whd/Crypto-Arch.png)

## Installation

#### Using docker

Clone the project 

```bash
git clone https://github.com/nehapatil31/track-crypto.git
```

```bash
cd track-crypto
```

```bash
docker-compose up --build
```

This will build the image and start the container.
Go to http://localhost:3000/ to view the app.

Note: To run container in detached mode
```bash
docker-compose up -d --build
```



#### For development mode


```bash
git clone https://github.com/nehapatil31/track-crypto.git
```

```bash
cd track-crypto
```
```bash
npm i
```
Create .env file at root level. 
Add mongodb connection string env variable.
```bash
MONGODB_URI =
```
```bash
npm run dev
```
## App Screenshot

![App Screenshot](https://i.ibb.co/ZNHT2v0/Screenshot-2024-07-16-at-12-08-40-AM.png)
