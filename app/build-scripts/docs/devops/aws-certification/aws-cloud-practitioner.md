# AWS certification

---

## Roadmap for professional DevOps certification
1. Foundational - AWS cloud practitioner
2. Associate - AWS SysOps administrator/AWS developer
3. Professional - AWS DevOps engineer

---

## What is cloud computing
- on demand delivery of computer power, database storage, applications and other IT resources
- pay-as-you-go pricing
- instant access to resources instantly of any size 

### Types of clouds

#### Private
- cloud services used by single organisations, not exposed to the public
- complete control
- e.g. Rackspace

#### Public
- cloud services owned and operated by third-party providers, delivered over the internet
- e.g. AWS, Azure

### Five characteristics of cloud computing
- on-demand self-service - *can provision resources without human interaction*
- broad network access - *resources available over network, accessed by diverse client platforms*
- multi-tenancy and resource pooling - *multiple clients can share same infra*
- rapid elasticity and scalability
- measured service - users pay correctly for what they use

### Six advantages
- trade capItal expense (CAPEX) for operational expense (OPEX)
  - pay on-demand, reduced total cost of ownership (TCO) and operational expense (OPEX)
- benefit from massive economies of scale - prices are more efficient due to large scale
- stop guessing capacity - scale based on actual usage
- increased speed and agility - due to on-demand
- stop spending money, running and maintaing data centers
- allows us to go global

### Problems solved by the cloud
- flexibility
- cost-effective
- scalability
- elasticity




### Types of cloud computing

#### Infrastructure as a service (IaaS)
- provide building blocks for cloud IT
- provides networking, computers and data storage
- highest level of flexibility
- easy parallel with traditional on-premises IT
- example of cloud computing types: AWS EC2
    
#### platform as a service
- removes need for your org to manage underlying infra
- focus and dev and management  
- example of cloud computing types: AWS Elastic Beanstalk
    
#### software as a service
- completed product that is run and managed by the service provider
- example of cloud computing types: Machine learning

#### Pricing of the cloud

3 pricing fundamentals
- compute - pay for compute time
- storage - pay for amount of data stored
- data transfer out
  - only pay when data leaves the cloud
  - data in is free
  


### AWS cloud overview

#### How to choose a region

- compliance with governance and legal requirements
- proximity to customers, means reduced latency
- available service, new services aren't available in every region
- pricing - pricing varies region to region

#### Availability zones
- each region has many availability zones
- usually, min is 2 max is 6, 
- e.g. `eu-west-1a`, `eu-west-1b` and `eu-west-1c`
- zones separated from each other so that they're isolated from disasters
- zones are connected with high bandwidth, ultra low-latency networking





### Shared Responsibility Model & AWS Acceptable Policy

#### shared responsibility diagram

https://d1.awsstatic.com/security-center/Shared_Responsibility_Model_V2.59d1eccec334b366627e9295b304202faf7b899b.jpg

- customer is responsible for security in the cloud
- awes responsible for security of the cloud

#### aws acceptable use policy

- no illegal, harmful or offensive use of content
- no security violations
- no network abuse
- no email or other message abuse

---

## IAM - Identity and Access Management

### Users & Groups

- IAM = Identity and Access Management, Global service
- Root account create by default, shouldn't be used or shared
- Users are people within your org and can be grouped
- groups can only contain users, not other groups
- users don't have to belong to groups and can belong to multiple groups

### Policies

- users or groups can be assigned json documents called policies
- policies describes what users/groups can do
- apply least privilege principle, don't give user more perm than they need

#### Policies structure
- consists of 
  - version: policy language version
  - id
  - statement: one or more
  
- statements consist of
  - sid: statement id
  - effect: whether stmt allows/denies access
  - principal: account/user/role which policy is applied to
  - action: list of actions policy allows/denies
  - resource: list of resources to which actions applied to
  - conditions: conditions for when the policy is in effect

### Password policy
in aws you can:
- set min pass length
- require specific character types
  - including upper/lowercase
  - numbers
  - non-alphabetical
- allow users to change their own passwords
- set password expiration policy
- prevent password re-use

### MFA - multi factor auth
- mfa = password you know + security device you own
- if pass is stolen or hacked, account is not compromised

#### MFA devices options:
- virtual mfa
  - google auth: works on one phone at a time
  - authy: can be used on multiple devices, including computer
- u2f (universal 2nd factor) security key
  - yubikey (3rd party), physical usb device
- hardware key fob mfa device
  - Gemalto 
- hardware key fob mfa device for aws GovCloud (US)
  - SurePassID key fob

### How can users access AWS
- three access options
  - management console
  - cli - command lint interface
  - sdk - software development kit, for code

#### access keys  
- generated through aws console
- users manage own keys
- access keys are secret, like passwords
- key id = username
- secret access key = password

### what is aws cli
- tool that allows interaction with aws with commands in command-lint shell
- has direct access to public apis
- open source
- alternative to console

### what is aws sdk
- aws software development kit
- language specific apis
- enables access to aws services programmatically
- embedded within application

### cloudshell
- aws browser cli
- allows access to aws cli
- free-to-use
- only available in select regions
- can download/upload files


### IAM roles
- services need to perform actions on your behalf
- we assign permissions to services via iam roles
- allows granting permissions to entities you trust  
- common roles
  - ec2 instance 
  - lambda function
  - roles for cloudformation
  
### IAM security tools
- IAM credentials report  (account-level)
  - report lists all account users and status of their credentials
- IAM access advisor
  - shows service permissions granted to a user and when they were last used
  - IAM > select user > access advisor
  
### IAM guidelines & best practices
- don't use root account, expect for AWS account setup
- one physical user = one aws user
- assign users to groups, assign permissions to groups
- create strong password policy
- enforce MFA
- create and use roles for giving permissions to aws services

### Shared responsibility Model for IAM
- aws
  - infrastructure
  - configuration and vulnerability analysis
  - compliance validation
- you
  - users, groups, roles, policies management and monitoring

---


## References

https://quidco.udemy.com/course/aws-certified-cloud-practitioner-new
