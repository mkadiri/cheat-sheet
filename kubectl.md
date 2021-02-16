get volume
`kubectl --context=sandbox --namespace=confused get pvc`

edit persistent volume claim
`kubectl --context=sandbox --namespace=confused edit pvc persistent-volume-claim-mysql-0`

edit persistent volume
`kubectl --context=sandbox --namespace=confused edit pv pvc-28b0f5ae-65bd-11eb-a8ae-06cfd2100a8a`

delete statefulset
`kubectl delete statefulset --context=sandbox --namespace=confused mysql`

get nodes
`kubectl get nodes`

view node cpu memory
`kubectl top nodes`