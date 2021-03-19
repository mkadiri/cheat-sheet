# Kubectl

## Commands

```shell
# example env variables
export NAMESPACE=dev
export POD=web-app
export CONTAINER=web-app-1

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

# requires metrics-server running on the cluster

# view node cpu/memory
kubectl top nodes

# view pod cpu/memory
kubectl top pods

# get horizontal pod autoscalers
kubectl get hpa

# descibe horizontal pod autoscalers
kubectl describe hpa ${POD}

# scale replicas
kubectl scale --replicas=1 deployment/${DEPLOYMENT_NAME}

# get vertical pod autoscalers
kubectl get vpa

# describe vertical pod autoscalers
kubectl describe vpa ${POD}
```




## Vertical Pod Autoscaler

https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler

### Install k8 resources

Prerequisites
- install openssl to version 1.1.1 or higher (needs to support -addext option)

```
# clone repo
git clone https://github.com/kubernetes/autoscaler.git

# verify kube config
./autoscaler/vertical-pod-autoscaler/hack/vpa-process-yamls.sh print

# run install
./autoscaler/vertical-pod-autoscaler/hack/vpa-up.sh
```

### Uninstall k8 resources

```shell
./autoscaler/vertical-pod-autoscaler/hack/vpa-down.sh

```

### k8 config example

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  labels:
    type: application
    service: my-app
  name: my-app
  namespace: my-ns
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Off"
```




## Horizontal Pod Autoscaler

https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/
https://www.pulumi.com/docs/reference/pkg/kubernetes/autoscaling/v2beta2/horizontalpodautoscalerlist/#

### k8 config example

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app
  namespace: my-ns
spec:
  minReplicas: 1
  maxReplicas: 5
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 75
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageValue: 500Mi
    - type: Pods
      pods:
        metric:
          name: packets-per-second
        target:
          type: AverageValue
          averageValue: 1k
```
