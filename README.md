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

  ### Nano

  | Command                 | Description                           |
  |-------------------------|---------------------------------------|
  | nano -l /path/to.file   | Open a file with line numbers         |
  | ctrl + _                | Jump to a line number                 |
  | ctrl + k                | Remove a line (go to the line first)  |
  
</details>


<details>
  <summary>Docker</summary>

  ## Docker

  ### Commands

  | Command                                                         | Description                     
  |:-                                                               |:-
  | `docker image prune`                                            | remove images                   
  | `docker volume prune`                                           | remove volume data              
  | `docker network prune`                                          | remove all networks
  | `docker rmi $(docker images -f "dangling=true" -q) --force`     | remove dangling images                
  | `docker rmi -f $(docker images -a -q)`                          | prune all
  | `docker exec -ti --user build transaction bash`                 | execute container with different user 
  | `docker cp container:/path/to.file ~/Downloads/`                | copy file from container to your env
  | `docker cp ~/Downloads/to.file container:/path/to.file`         | copy file from your env to a container
  

  | Command                                                         | Description
  |:-                                                               |:-
  | `docker exec -i mysql mysql <<< "CREATE DATABASE test;"`        | run query on mysql container
  | `docker exec mysql /usr/bin/mysqldump -u root --password=root [DATABASE] > ~/[BACKUP_FILE].sql` | backup database
  | `cat ~/[BACKUP_FILE].sql \| docker exec -i mysql /usr/bin/mysql -u root --password=root [DATABASE]` | restore database
  | `docker exec -i [CONTAINER] /var/www/site/vendor/bin/doctrine-module m:m` | run doctrine migrations on container
  | `docker exec -ti [CONTAINER] bash -c "echo 'xdebug.remote_host = 172.17.0.1' >> /etc/php/7.1/mods-available/xdebug.ini && service apache2 reload"` | update config file and restart apache
</details>