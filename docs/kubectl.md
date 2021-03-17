```
# display all contexts
kubectl config get-contexts

# display current context
kubectl config current-context 

# exec on to pod on namespace
kubectl exec -ti --namespace=${NAMESPACE} ${POD} bash

# exec mysql command on pod
kubectl exec -ti --namespace=${NAMESPACE} ${POD} mysql <<< "show tables;"

# run commands on pod
kubectl exec -ti --namespace=${NAMESPACE} ${POD} -- bash -c "echo 'hello world'"

# backup database on mysql container
kubectl exec -ti --namespace=${NAMESPACE} ${POD} -- bash -c "mysql -u root --password=root ${DATABASE} < ~/${DATABASE}.sql" 

# exec from specific container
kubectl exec -ti --namespace=${NAMESPACE} --container=${CONTAINER} ${POD} bash

# Flush redis cache
kubectl exec -ti --namespace=${NAMESPACE} ${POD} redis-cli FLUSHALL

# list clusters
kubectl config get-contexts

# list pods on a namespace
kubectl get pods --context=${CONTEXT} --namespace=${NAMESPACE}

# view all of the containers in a pod.
kubectl describe pod/${POD} --namespace=${NAMESPACE}

# view logs of a pod
kubectl logs -f --namespace=${NAMESPACE} ${POD}

# log output from specific container
kubectl logs -f --namespace=${NAMESPACE} --container=${CONTAINER} ${POD}

# delete pods that have the `CrashLoopBackOff` status
kubectl delete pod --namespace=${NAMESPACE} `kubectl get pods | awk '$3 == "CrashLoopBackOff" {print $1}'`

# get pods on namespace
kubectl get pods --namespace=${NAMESPACE}

# deploy deployment
kubectl apply -f deployment.yaml --namespace=${NAMESPACE} 

# example env variables
export NAMESPACE=dev
export POD=web-app
export CONTAINER=web-app-1

# get volume
kubectl --context=sandbox --namespace=confused get pvc

# edit persistent volume claim
kubectl --context=sandbox --namespace=confused edit pvc persistent-volume-claim-mysql-0

# edit persistent volume
kubectl --context=sandbox --namespace=confused edit pv pvc-28b0f5ae-65bd-11eb-a8ae-06cfd2100a8a

# delete statefulset
kubectl delete statefulset --context=sandbox --namespace=confused mysql

# get nodes
kubectl get nodes


# metrics
# requires metrics-server running on the cluster

# view node cpu/memory
kubectl top nodes

# view pod cpu/memory
kubectl top pods
```