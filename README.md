# Cheat sheet wiki

## Misc

<details>
  <summary>Homebrew</summary>

  ### Homebrew

  Switch PHP versions
  
  `brew link --force php@7.3`
</details>

<details>
  <summary>Elasticsearch 7</summary>

  
  ### Create
  Create an index with mappings
  ```
  PUT /transaction
  {
      "mappings": {
          "dynamic": true,
          "properties" : {
              "commission" : {
                  "type" : "long"
              },
              "id" : {
                  "type" : "integer"
              },
              "title" : {
                  "type" : "text"
              },
              "user" : {
                  "properties" : {
                      "user_id" : {
                          "type" : "integer"
                      }
                  }
              },
              "created_at" : {
                  "type" : "date",
                  "format":"yyyy-MM-dd HH:mm:ss"
              }
          }
      }
  }
  ```
  
  Create documents
  ```
  POST /user/_doc/78
  {
    "user_id": 78,
    "name": "matt smith"
  }
  ```
  
  ```
  POST /transaction/_doc/1
  {
    "transaction_id": 1,
    "user_id": 78,
    "network_transaction_id": 101,
    "commission": 12
  }
  ```
  
  ### List/search
  
  List all indices
  ```
  GET _cat/indices
  ```

  List all docs from an index
  ```
  GET /cdnctl-messages/_search
  {
    "query": {
      "match_all": {}
    }
  }
  ```
  
  Search for everying
  ```
  GET _search
  {
    "query": {
      "match_all": {}
    }
  }
  ```
  
  Returns all documents within an index
  ```
  GET /transaction/_search
  ```

  Returns a single document within an index
  ```
  GET /transaction/_doc/1
  ```
  
  
  ### Delete
  ```
  DELETE /transaction
  ```

  ### Mapping

  #### Mapping Types
  - Mapping types are deprecated in 6.0.0.
  - Mapping types can be compared to tables, it allows you to divide documents in to groups
  - e.g. index with a mapping type /students/student

  #### Create a mapping

  (Create an index first)

  ```
  PUT /transaction/_mapping
  {
    "properties": {
        "created_at" : {
            "type" : "date",
            "format":"yyyy-MM-dd HH:mm:ss"
        }
    }
  }
  ```
  
  ### Percolators
  - A percolator is a reverse search
  - We store queries as percolators and run documents against them

  ### Scripts

  Return a generated object with a boosted transaction commission

  ```
  GET /transaction/_search
  {
    "script_fields": {
        "boosted_commission": {
            "script": {
                "lang": "painless",
                "source": """
                    def tran = params._source;
                    def commission = tran.commission;
                    def variableRate = 0.95;
                    def premium = commission * 0.10;
                    def boosted = (commission * variableRate) + premium;
                    def calculation = "(commission * variableRate) + premium";

                    HashMap map = new HashMap();
                    map.put("commission", tran.commission);
                    map.put("premium", premium);
                    map.put("variableRate", variableRate);
                    map.put("boosted", boosted);
                    map.put("calculation", calculation);

                    return map;
                """
            }
        }
    }
  }
  ```

  ### References
  - https://logz.io/blog/removal-elasticsearch-mapping-types/
  - https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-operators-reference.html
  - https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-bucket-script-agg-context.html#painless-bucket-script-agg-context
  
</details>


<details>
  <summary>Git</summary>

  ### Git 

  ```
  # create and push tag
  git tag v3.0.0
  git push --tags
  
  # fatal: refusing to merge unrelated histories 
  git pull origin master --allow-unrelated-histories

  # returns account used to push/pull
  git remote -v

  # change remote branch
  git remote set-url origin [URL]

  # switch accounts
  git config --global user.name 'mkadiri'
  git config --global user.email 'my@email.com'

  # delete tags
  git push --delete origin v1.11.1 && git tag --delete v1.11.1  

  # revert code to a previous commit
  git reset --hard head~1

  # store credentials
  git config credential.helper store
  git pull


  # rebase, merge commits in to one
  git fetch -p
  git rebase -i origin/master

  You'll now see an editable page.
  - The first commit should have the keyword `pick` prepended
  - The remaining should use the keyword `f`
  - Save changes and quit `:wq`

  git push -f


  # amend commit message
  git commit --amend
  git push -f


  # amend commit author
  git commit --amend --author="name <email>"
  git push -f

  # show all commits in one line
  git log --oneline

  # display all commits of a branch that has yet to be merged in to master
  git log --oneline `git merge-base lazy-mo master`..lazy-mo

  # pull a branch after rebase to fix `CONFLICT` error (change dest branch if necessary)
  git fetch origin && \
  git reset --hard origin/develop && \
  git pull --rebase

  # branch has diverged error
  git checkout develop
  git branch ${branch} -D
  git checkout ${branch}

  # view config
  git config --list

  # find git config location
  git config --list --show-origin

  # setup keys
  ssh-keygen -t ed25519 -C "<comment>"
  ssh-add -K ~/.ssh/id_rsa
  ```
</details>

<details>
  <summary>Bash</summary>

  ### Bash

  ```
  # Nano

  # Open a file with line numbers
  nano -l /path/to.file
  
  # Jump to a line number 
  ctrl + _               

  # Remove a line (go to the line first)
  ctrl + k                
  ```

  ```
  # awk

  # if 3rd column has the value "mkadiri", print out "yes"
  ls -l | awk '$3 == "mkadiri" {print "yes"}'
  ```
  
  ```
  # empty and write to a file
  echo "hello world" > hello.txt

  # add on to a file
  echo "hello world" >> hello.txt

  # give file exec priv
  chmod +x temp.sh

  # logout user
  sudo pkill -KILL -u ${USERNAME}

  # login as another user
  su '${USERNAME}'

  # find files with php file ext
  find . -name *.php

  # check currently logged in user
  whoami

  # create symbolic link, creates link to bin (application) folder
  ln -s ~/.git/kubenv /usr/local/bin/kubenv

  ```

  ```
  # direnv
  # https://direnv.net/
  # direnv is an extension for your shell. 
  # It augments existing shells with a new feature that can load and unload environment variables depending on the current directory.

  # install 
  brew install direnv
  eval "$(direnv hook bash)"

  ```
  
</details>


<details>
  <summary>Finance</summary>

  ### Finance

  ```
  AMC = Annual management charge
  The cost of managing funds/investments

  ISA = Individual savings account
  - UK equivalant of an IRA
  - Money made from investments in an ISA are tax-free
  - Allows you to deposit £20k a year (as of 2020)

  LISA = Lifetime Individual savings account
  - Similar to an ISA
  - Can only be accessed at retirement or for buying a first home
  - Allows you to deposit £4k a year
  - You receive a 25% bonus (up to £1k) from the government every year
  - Available to 18-39 year olds

  Shorting a stock
  - This is when you bet that the price of a stock will go down
  - How it works
    - You borrow a stock (fees normally apply)
    - Immediately sell the stock
    - Wait for the value to go down and buy it back
    - Return the shares and pocket the difference
    - e.g. 
      day 1 buy 10 shares for 10k with each share worth £1k
      day 2 share price drops to £800, buy back 10 shares.
      return those 10 shares that you bought back for £8k and keep £2k
  ```
</details>

## DevOps

<details>
  <summary>Kubernetes</summary>

  ### Kubernetes
  an image orchestration tool

  #### AWS EKS
  - Elastic Kubernetes Service 

  #### AWS Fargate
  - serverless compute engine for containers
  - allocates the right amount of compute 
  - eliminates need to scale or choose instances
  - https://aws.amazon.com/fargate/

  #### Cluster
  - a collection of computers connected to work as a single unit
  - contains nodes
    - is a physical or virtual machine
    - master (one in a cluster)
      - co-ordinates cluster
      - manages worker nodes
      - responsible for orchestration 
    - worker (multiple in a cluster)
      - runs applications

  #### Pod
  - smallest unit of deployment
  - sits in a worker node
  - has one or more containers
  - needs to specify container images
  
  
  
  
  
  
  
  
  


  #### Deployment
  - checks health of a pod
  - restarts pods container if it terminates
  - manage the creation and scaling of pods

  ### Service
  - defines policy to access pods
  - targeted pods are defined usually by a selector
  - define a selector to match pods, port you want to expose and target port
  - A Kubernetes Service is an abstraction which defines a logical set of Pods running somewhere in your cluster, that all provide the same functionality.
  - When created a clusterIP is assigned


  #### ClusterIP
  - default Kubernetes service
  - creates service inside cluster that other apps in the cluster can access
  - no external access (from the internet) unless you use a Kubernetes proxy
  - https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0



  #### ClusterIP vs NodePort vs LoadBalancer


</details>

<details>
  <summary>Kubectl</summary>
  
  ### Kubectl

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

  ```
</details>

<details>
  <summary>Minikube</summary>

  ### Minikube

  #### What is Minikube?
  - A tool that allows you to run kubernetes locally
  - Minikube runs a single-node Kubernetes cluster inside a Virtual Machine

  ```
  # start minikube
  minikube start
  ```
</details>

<details>
  <summary>Kinesis</summary>

  ### Kinesis

  #### What is a shard
  - Is the base throughput unit of an Amazon Kinesis data stream
  - One shard provides a capacity of 1MB/sec data input and 2MB/sec data output

</details>

<details>
  <summary>Terraform</summary>

  general syntax for terraform resource

  ```
  resource "<PROVIDER>_<TYPE>" "<NAME>" {
    [CONFIG …]
  }
  ```

  ```
  # terraform comes with basic functionality but no code for providers such as AWS
  # init downloads this code
  terraform init`
  
  # let's you see what terraform will do before actually doing it
  terraform plan

  # create instances
  terraform apply
  ```


  `PROVIDER` = provider name, `TYPE` = type of resource, `NAME` = identifier, `CONFIG` = arguments
</details>

<details>
  <summary>AWS</summary>

  ### AWS

  #### AMI 
  - Amazon machine image
  - The image to run on your EC2 instance
  - Free and paid are available https://aws.amazon.com/marketplace/
  - Can create you own https://packer.io/

  #### EC2
  - A server is called an EC2 instance

  #### ECS
  - Amazon Elastic Container
  
  ##### Clusters
  - A regional group of container instances on which you can run task requests
  - Each account receives a default cluster the first time you use the Amazon ECS service. 
  - Clusters may contain more than one Amazon EC2 instance type.

  #### ELB
  - Amazon elastic load balancer
  - Automatically distributes incoming traffic across multiple targets
  - such as EC2 instances, containers, IP addresses, and Lambda functions
  - https://aws.amazon.com/elasticloadbalancing/

  #### VPC
  - Virtual Private Cloud
  - Virtual network dedicated to your AWS account
  - Allows you to launch AWS resources in to virtual network
  - Virtual network resembles a traditional network
  - You must have either two private subnets or two public subnets available to create a DB subnet group for a DB instance to use in a VPC

  #### NAT
  Network address translation

  #### Subnet
  - A range of IP addresses in your VPC
  - sub-section of a network
  - includes all computers in a specific location
  - subnets in different availability zones create fault tolerance, availability and redundancy 
  - public of private
  - public has access to the internet
  - you define a public/private subnet with route tables
  - subnets associated with a route table that have access to an internet gateway are public
  - internally resources in different subnets should be able to communicated with each other

  ### internet gateway
  allows us to connect to the internet

  #### Route tables
  - Contains set of rules, called routes
  - Used to determine where network traffic is directed

  #### CIDR 
  - Classless Inter-Domain Routing
  - a method for allocating IP addresses and IP routing

  ### ENI
  - Elastic network interfaces

  #### Ingress
  Ingress is an object that allows access to your Kubernetes services from outside the Kubernetes cluster
  
  #### References
  https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateVPC.html
</details>

## Programming

<details>
  <summary>PHP</summary>
  
  ### PHP

  #### Composer
  ```
  # update single package
  composer update doctrine/doctrine-fixtures-bundle

  # increase composer memory
  COMPOSER_MEMORY_LIMIT=-1 composer install

  # require a specific branch of a library, prepend with `dev-`
  composer require google/apiclient:dev-feature-123 

  # errors

  # The requested package maple-syrup-group/qp-lib-event-bus dev-kinesis exists as ${LIBRARY}[v1.0.0, ..] but these are rejected by your constraint.
  composer clear

  # composer not pulling latest library code
  composer clearcache
  composer upgrade
  
  # view php ini information
  php --ini
  ```
</details>

<details>
  <summary>Golang</summary>

  ### Golang

  ```
  # install golang on ubuntu
  sudo apt-get update && sudo apt-get install golang-go

  # test multiple packages
  go test ./...

  # build go application, make it verbose and specify output
  go build -v -o /bin/app

  # running binary
  sudo chmod +x [binary]
  ./[binary]

  # building and running binary

  # linux
  env GOOS=linux GOARCH=amd64 go build -o app && \
  chmod +x app && \
  ./app

  # mac os
  env GOOS=darwin GOARCH=amd64 go build -o app && \
  chmod +x app && \
  ./app
  ```

  ```
  # create template
  pip install cookiecutter

  cookiecutter https://github.com/lacion/cookiecutter-golang.git
  ```
</details>

<details>
  <summary>Python</summary>

  ### Python

  #### PIP

  Is a  Python package manager

  ```
  # install
  sudo apt install python-pip

  nano ~/.bashrc
  
  # add the following to the end 
  PATH=$PATH:~/.local/bin
  ```

</details>
