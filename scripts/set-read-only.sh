#!/bin/bash

# CREDIT TO THESE TUTORIALS:
# petr.io/en/blog/2015/11/09/read-only-raspberry-pi-with-jessie
# hallard.me/raspberry-pi-read-only
# k3a.me/how-to-make-raspberrypi-truly-read-only-reliable-and-trouble-free


# START INSTALL ------------------------------------------------------------
# All selections have been validated at this point...

# Given a filename, a regex pattern to match and a replacement string:
# Replace string if found, else no change.
# (# $1 = filename, $2 = pattern to match, $3 = replacement)
replace() {
  grep $2 $1 >/dev/null
  if [ $? -eq 0 ]; then
    # Pattern found; replace in file
    sed -i "s/$2/$3/g" $1 >/dev/null
  fi
}

# Given a filename, a regex pattern to match and a replacement string:
# If found, perform replacement, else append file w/replacement on new line.
replaceAppend() {
  grep $2 $1 >/dev/null
  if [ $? -eq 0 ]; then
    # Pattern found; replace in file
    sed -i "s/$2/$3/g" $1 >/dev/null
  else
    # Not found; append on new line (silently)
    echo $3 | sudo tee -a $1 >/dev/null
  fi
}

# Given a filename, a regex pattern to match and a string:
# If found, no change, else append file with string on new line.
append1() {
  grep $2 $1 >/dev/null
  if [ $? -ne 0 ]; then
    # Not found; append on new line (silently)
    echo $3 | sudo tee -a $1 >/dev/null
  fi
}

# Given a filename, a regex pattern to match and a string:
# If found, no change, else append space + string to last line --
# this is used for the single-line /boot/cmdline.txt file.
append2() {
  grep $2 $1 >/dev/null
  if [ $? -ne 0 ]; then
    # Not found; insert in file before EOF
    sed -i "s/\'/ $3/g" $1 >/dev/null
  fi
}

echo
echo "Starting installation..."
echo "Updating package index files..."

echo "Removing unwanted packages..."
apt-get remove -y --force-yes --purge triggerhappy logrotate dphys-swapfile fake-hwclock
apt-get -y --force-yes autoremove --purge

# Replace log management with busybox (use logread if needed)
echo "Installing ntp and busybox-syslogd..."
apt-get -y --force-yes install ntp busybox-syslogd
dpkg --purge rsyslog

echo "Configuring system..."

# Add fastboot, noswap and/or ro to end of /boot/cmdline.txt
append2 /boot/cmdline.txt fastboot fastboot
append2 /boot/cmdline.txt noswap noswap
append2 /boot/cmdline.txt ro^o^t ro

# Move /var/spool to /tmp
rm -rf /var/spool
ln -s /tmp /var/spool

# Make SSH work
replaceAppend /etc/ssh/sshd_config "^.*UsePrivilegeSeparation.*$" "UsePrivilegeSeparation no"
# bbro method (not working in Jessie?):
#rmdir /var/run/sshd
#ln -s /tmp /var/run/sshd

# Change spool permissions in var.conf (rondie/Margaret fix)
replace /usr/lib/tmpfiles.d/var.conf "spool\s*0755" "spool 1777"

# Move dhcpd.resolv.conf to tmpfs
touch /tmp/dhcpcd.resolv.conf
rm /etc/resolv.conf
ln -s /tmp/dhcpcd.resolv.conf /etc/resolv.conf

# Make edits to fstab
# make / ro
# tmpfs /var/log tmpfs nodev,nosuid 0 0
# tmpfs /var/tmp tmpfs nodev,nosuid 0 0
# tmpfs /tmp     tmpfs nodev,nosuid 0 0
replace /etc/fstab "vfat\s*defaults\s" "vfat    defaults,ro "
replace /etc/fstab "ext4\s*defaults,noatime\s" "ext4    defaults,noatime,ro "
append1 /etc/fstab "/var/log" "tmpfs /var/log tmpfs nodev,nosuid 0 0"
append1 /etc/fstab "/var/tmp" "tmpfs /var/tmp tmpfs nodev,nosuid 0 0"
append1 /etc/fstab "\s/tmp"   "tmpfs /tmp    tmpfs nodev,nosuid 0 0"

cat <<EOT >> /etc/bash.bashrc

# set variable identifying the filesystem you work in (used in the prompt below)
fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")

# alias ro/rw
alias roroot='mount -o remount,ro / ; fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")'
alias rwroot='mount -o remount,rw / ; fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")'

# setup fancy prompt
export PS1='\[\033[01;32m\]\u@\h\${fs_mode:+(\$fs_mode)}\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\\\$ '

# aliases for mounting boot volume
alias roboot='mount -o remount,ro /boot'
alias rwboot='mount -o remount,rw /boot'

EOT

cat <<EOT >> /home/pi/.bashrc

# set variable identifying the filesystem you work in (used in the prompt below)
fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")

# alias ro/rw
alias roroot='sudo mount -o remount,ro / ; fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")'
alias rwroot='sudo mount -o remount,rw / ; fs_mode=\$(mount | sed -n -e "s/^.* on \/ .*(\(r[w|o]\).*/\1/p")'

# setup fancy prompt
export PS1='\[\033[01;32m\]\u@\h\${fs_mode:+(\$fs_mode)}\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\\\$ '

# aliases for mounting boot volume
alias roboot='sudo mount -o remount,ro /boot'
alias rwboot='sudo mount -o remount,rw /boot'

EOT