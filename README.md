
# track-crypto

It shows latest price changes of following crypto currencies -
Bitcoin, Ethereum, Tether, Binancecoin, Solana.


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
Create .env file at root level. 
Add mongodb connection string env variable.
```bash
MONGODB_URI =
```
```bash
npm run dev
```
