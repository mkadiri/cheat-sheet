# Linux

## Update OS timezone (CentOS)
- `sudo -i`
- `nano /etc/sysconfig/clock` # change `ZONE` to `Europe/London`
- `ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime` # create symlink for 
- check `date` make sure `date -u` returns the correct UTC time
