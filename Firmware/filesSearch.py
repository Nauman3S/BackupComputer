#!/usr/bin/env python

import os
from os import listdir
from os.path import isfile, join
from glob import glob
from subprocess import check_output, CalledProcessError

def get_usb_devices():
    sdb_devices = map(os.path.realpath, glob('/sys/block/sd*'))
    usb_devices = (dev for dev in sdb_devices
        if 'usb' in dev.split('/')[5])
    print(dict((os.path.basename(dev), dev) for dev in usb_devices))
    return dict((os.path.basename(dev), dev) for dev in usb_devices)

def get_mount_points(devices=None):
    devices = devices or get_usb_devices() # if devices are None: get_usb_devices
    print(devices)
    print(get_usb_devices())
    output = check_output(['mount']).splitlines()
    output = [tmp.decode('UTF-8') for tmp in output]
    print(output)
    is_usb = lambda path: any(dev in path for dev in devices)
    usb_info = (line for line in output if is_usb(line.split()[0]))
    #print(is_usb)
    #print(usb_info)
    #return [(info.split()[0], info.split()[2]) for info in usb_info]
    fullInfo = []
    for info in usb_info:
        print(info)
        mountURI = info.split()[0]
        usbURI = info.split()[2]
        print(info.split().__sizeof__())
        for x in range(3, info.split().__sizeof__()):
            if info.split()[x].__eq__("type"):
                for m in range(3, x):
                    usbURI += " "+info.split()[m]
                break
        fullInfo.append([mountURI, usbURI])
    return fullInfo


def getFilesList():
    files=get_mount_points(get_usb_devices())
    print(files)
    if(files!=[]):
        files[0]=files[0][1]
        print (files)
        mm=os.listdir(files[0])
        print(mm)
        return mm
    else:
        return []

# a=open(files[0]+"/"+str(mm[0]),'r')
# aaa=a.read()
# print(aaa)
# a.close()

print(getFilesList())