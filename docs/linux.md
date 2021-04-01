# Linux

## Update OS timezone (CentOS)
- `sudo -i`
- `nano /etc/sysconfig/clock` # change `ZONE` to `Europe/London`
- `ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime` # create symlink for 
- make sure `date -u` returns correct UTC time
