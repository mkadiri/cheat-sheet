# Elasticsearch 7

## Create

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

## List/search

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

Search for everything
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


## Delete
  ```
  DELETE /transaction
  ```

## Mapping

### Mapping Types
- Mapping types are deprecated in 6.0.0.
- Mapping types can be compared to tables, it allows you to divide documents in to groups
- e.g. index with a mapping type /students/student

### Create a mapping

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

## Percolators
- A percolator is a reverse search
- We store queries as percolators and run documents against them

## Scripts

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

## References
- https://logz.io/blog/removal-elasticsearch-mapping-types/
- https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-operators-reference.html
- https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-bucket-script-agg-context.html#painless-bucket-script-agg-context
  