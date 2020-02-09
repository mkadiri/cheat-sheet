# Cheat sheet wiki

<details>
  <summary>Elasticsearch 7</summary>

  ## Elasticsearch 7 

  ### Index
  #### Create
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
            "merchant_id" : {
                "type" : "integer"
            },
            "network_transaction_id" : {
                "type" : "integer"
            },
            "user" : {
                "properties" : {
                    "user_id" : {
                        "type" : "integer"
                    },
                    "user_type" : {
                        "type" : "integer"
                    }
                }
            },
            "rate" : {
                "properties" : {
                    "rate_id" : {
                        "type" : "long"
                    },
                    "multiplier" : {
                        "type" : "float"
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

  #### Delete
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
  
  ### Create documents
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

  ### Search documents
  
  Returns all documents within an index
  ```
  GET /transaction/_search
  ```

  Returns a single document within an index
  ```
  GET /transaction/_doc/1
  ```

  ### Percolators
  - A percolator is a reverse search
  - We store queries as percolators and run documents against them
  - 

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
  <summary>Bash</summary>

  ## Bash

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

  ```
  
</details>


<details>
  <summary>Docker</summary>

  ## Docker

  ``` 
  # remove images
  docker image prune
  
  # remove volume data
  docker volume prune          

  # remove all networks
  docker network prune

  # remove dangling images
  docker rmi $(docker images -f "dangling=true" -q) --force                 
  
  # prune all
  docker rmi -f $(docker images -a -q)
  
  # execute container with different user 
  docker exec -ti --user ${USER} ${CONTAINER} bash
  
  # copy file from container to your env
  docker cp ${CONTAINER}:/${FILE_PATH} ${OUTPUT_PATH}
  
  # copy file from your env to a container
  docker cp ${OUTPUT_PATH} ${CONTAINER}:${FILE_PATH}
  
  # run query on mysql container
  docker exec -i ${CONTAINER} mysql <<< "CREATE DATABASE test;" 
  
  # backup database
  docker exec ${CONTAINER} /usr/bin/mysqldump -u root --password=root ${DATABASE} > ${OUTPUT_PATH}

  # restore database
  cat ${FILE_PATH} | docker exec -i ${CONTAINER} /usr/bin/mysql -u root --password=root ${DATABASE}
  
  # run doctrine migrations on container
  docker exec -i ${CONTAINER} /var/www/site/vendor/bin/doctrine-module m:m
  
  # update config file and restart apache
  docker exec -ti ${CONTAINER} bash -c "echo 'xdebug.remote_host = 172.17.0.1' >> /etc/php/7.1/mods-available/xdebug.ini && service apache2 reload"
  ```
</details>

<details>
  <summary>Kubernetes</summary>

  ## Kubernetes

</details>

<details>
  <summary>Kubectl</summary>
  
  ## Kubectl

  ```
  # exec on to container on namespace
  kubectl exec -ti --namespace=${NAMESPACE} ${CONTAINER} bash

  # exec mysql command on container
  kubectl exec -ti --namespace=${NAMESPACE} ${CONTAINER} mysql <<< "show tables;"

  # run commands on container
  kubectl exec -ti --namespace=${NAMESPACE} ${CONTAINER} -- bash -c "echo 'hello world'"

  # backup database on mysql container
  kubectl exec -ti --namespace=${NAMESPACE} ${CONTAINER} -- bash -c "mysql -u root --password=root ${DATABASE} < ~/${DATABASE}.sql" 

  # exec from specific container
  kubectl exec -ti --namespace=${NAMESPACE} --container=${CONTAINER} ${POD} bash

  # Flush redis cache
  kubectl exec -ti --namespace=${NAMESPACE} ${CONTAINER} redis-cli FLUSHALL

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

  # example env variables
  export NAMESPACE=dev
  export POD=web-app
  export CONTAINER=web-app-1

  ```
</details>

<details>
  <summary>Minikube</summary>

  ## Minikube

  ### What is Minikube?
  - A tool that allows you to run kubernetes locally
  - Minikube runs a single-node Kubernetes cluster inside a Virtual Machine

  ### Install

  ```
  # VirtualBox
  sudo add-apt-repository multiverse && sudo apt-get update

  # Minikube
  # https://kubernetes.io/docs/tasks/tools/install-minikube/#before-you-begin
  curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
    && chmod +x minikube

  sudo install minikube /usr/local/bin
  ```

  Note: make sure you have virtualization enabled on you machine, this needs to be
  enabled from the bios
</details>

<details>
  <summary>Finance</summary>

  ## Finance

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