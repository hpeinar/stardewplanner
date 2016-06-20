$setup = <<SETUP
sudo -i
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs node-gyp
mkdir -p /var/log/stardewplanner
chown vagrant /var/log/stardewplanner
cd /vagrant
npm config set bin-links false
npm install
SETUP

$startup = <<STARTUP
cd /vagrant
node index.js > "/var/log/stardewplanner/$(date +%Y-%m-%d_%H:%M).log" 2>&1 &
STARTUP

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision "shell", inline: $setup
  config.vm.provision "shell", inline: $startup, run: "always", privileged: false
  config.vm.network :forwarded_port, host: 3000, guest: 3000
  config.vm.synced_folder ".", "/vagrant", :mount_options => ["dmode=777","fmode=666"]
  config.vm.hostname = "vagrant"
  config.ssh.insert_key = false
end
