Demo steps to repricate:
1. Start minikube
2. Check the status of the nginx, prometheus, keda
3. Check the status of hpa 
```
kubectl get hpa
```
4. Initial load generate
```
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://nginx-metrics.default.svc.cluster.local:9113/metrics done"
```
5. Check the status of hpa
```
kubectl get hpa --watch
```
6. Check the status of nginx pods
```
kubectl get pods --watch
```
