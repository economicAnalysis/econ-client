echo "-----------var/log/supervisor/output------------" >> RESULTS.log
ssh root@localhost -p 50008 -i client_docker_rsa 'cat /var/log/supervisor/node-std*' >> RESULTS.log

cat RESULTS.log