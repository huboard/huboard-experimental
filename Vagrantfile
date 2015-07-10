# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "puppetlabs/ubuntu-14.04-64-puppet"

  config.vm.synced_folder ".", "/srv/huboard", type: "nfs"
  config.vm.network "private_network", ip: "192.168.50.10"

  config.vm.network "forwarded_port", guest: 4200, host: 4200
end
