# Kubernetes

An image orchestration tool

## AWS EKS
- Elastic Kubernetes Service

## AWS Fargate
- serverless compute engine for containers
- allocates the right amount of compute
- eliminates need to scale or choose instances
- https://aws.amazon.com/fargate/

## Cluster
- a collection of computers connected to work as a single unit
- contains nodes
    - is a physical or virtual machine
    - master (one in a cluster)
        - co-ordinates cluster
        - manages worker nodes
        - responsible for orchestration
    - worker (multiple in a cluster)
        - runs applications

## Pod
- smallest unit of deployment
- sits in a worker node
- has one or more containers
- needs to specify container images

## Deployment
- checks health of a pod
- restarts pods container if it terminates
- manage the creation and scaling of pods

## Service
- defines policy to access pods
- targeted pods are defined usually by a selector
- define a selector to match pods, port you want to expose and target port
- A Kubernetes Service is an abstraction which defines a logical set of Pods running somewhere in your cluster, that all provide the same functionality.
- When created a clusterIP is assigned


## ClusterIP
- default Kubernetes service
- creates service inside cluster that other apps in the cluster can access
- no external access (from the internet) unless you use a Kubernetes proxy
- https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0
