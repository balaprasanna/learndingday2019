## Build your own image
```
docker build -t simple-app:v1 .
```

```
docker run -d -it --name app -p 3000:3000 simple-app:v1
```

## Test your APP.
```
curl localhost:3000
```