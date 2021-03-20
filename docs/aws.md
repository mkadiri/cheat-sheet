# AWS

## AMI
- Amazon machine image
- The image to run on your EC2 instance
- Free and paid are available https://aws.amazon.com/marketplace/
- Can create you own https://packer.io/

## EC2
- Elastic Compute Cloud
- A server is called an EC2 instance

## ECS
- Amazon Elastic Container

### Clusters
- A regional group of container instances on which you can run task requests
- Each account receives a default cluster the first time you use the Amazon ECS service.
- Clusters may contain more than one Amazon EC2 instance type.

## ELB
- Amazon elastic load balancer
- Automatically distributes incoming traffic across multiple targets
- such as EC2 instances, containers, IP addresses, and Lambda functions
- https://aws.amazon.com/elasticloadbalancing/

## VPC
- Virtual Private Cloud
- Virtual network dedicated to your AWS account
- Allows you to launch AWS resources in to virtual network
- Virtual network resembles a traditional network
- You must have either two private subnets or two public subnets available to create a DB subnet group for a DB instance to use in a VPC

## NAT
Network address translation

## Subnet
- A range of IP addresses in your VPC
- sub-section of a network
- includes all computers in a specific location
- subnets in different availability zones create fault tolerance, availability and redundancy
- public of private
- public has access to the internet
- you define a public/private subnet with route tables
- subnets associated with a route table that have access to an internet gateway are public
- internally resources in different subnets should be able to communicated with each other

## internet gateway
allows us to connect to the internet

## Route tables
- Contains set of rules, called routes
- Used to determine where network traffic is directed

## CIDR
- Classless Inter-Domain Routing
- a method for allocating IP addresses and IP routing

## ENI
- Elastic network interfaces

## Ingress
Ingress is an object that allows access to your Kubernetes services from outside the Kubernetes cluster

## References
https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateVPC.html