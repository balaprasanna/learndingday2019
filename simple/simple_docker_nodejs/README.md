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


## Push your image to docker HUB
Signup for dockerhub if you dont have an account.

Step :1
```
docker login
```

Step :2
```
docker tag simple-app  balanus/simple-app
```

Step :3
```
docker push  balanus/simple-app
```


## Deploying with k8s

### prepare your single node K8S Cluster
- minikube start
- minikube status
- minikube ip

### Now lets deploy the app
```
kubectl create -f app-deployment.yml
```

```
kubectl get pods
```

```
kubectl create -f app-service.yml
```

```
kubectl get services
minikube service simple-app --url
```

### App is now running inside kubernetes cluster.
```
service_ip=$(minikube service simple-app --url)
curl $service_ip
```


### Lets scale our APP

```
kubectl scale deployments/simple-app --replicas=4
```

```
kubectl get pods -w
std-user01$ kubectl get pods -w
NAME                          READY     STATUS    RESTARTS   AGE
simple-app-797fcf475f-bjvpw   1/1       Running   0          12m
simple-app-797fcf475f-c75ng   1/1       Running   0          24s
simple-app-797fcf475f-fps7s   1/1       Running   0          24s
simple-app-797fcf475f-pq8tx   1/1       Running   0          24s
```


### Rolling Update..

Perform a rolling update
```
kubectl set image deployments/simple-app simple-app=balanus/simple-app:v2
```

Check rollout history
```
kubectl rollout status deployments/simple-app
```


Perform rollback

```
kubectl rollout undo deployments/simple-app
```