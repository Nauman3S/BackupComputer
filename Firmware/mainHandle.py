import os
import paho.mqtt.client as mqtt #import the client1
import time
import json
import time
import ast
import fileSearch

filesString=""
filesList=fileSearch.getFilesList()
for i in range(0,len(filesList)):

    filesString=filesString+filesList[i]+","
filesString=filesString[:-1]#removes last comma

############
def on_message(client, userdata, message):
    msgV=str(message.payload.decode("utf-8"))
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

    if(message.topic=="backupcomputer/drawer/lock"):
        print(msgV)

    if(message.topic=="bkc-device/printer"):
        print("printing::", msgV)
        listN=ast.literal_eval(msgV)
        print(listN[0])
        k=listN[0].split(',')
        if(listN[1]=='Print'):
            print("printing ",k)
            for i in range(0,len(k)):
                os.system("lpr "+fileSearch.getURI()+ '/'+k[i])
        elif(listN[1]=='Scan'):
            print("scanning ", k)
        elif(listN[1]=='Fax'):
            print("Faxing ", k)
        elif(listN[1]=='Copy'):
            print("Copying ", k)
########################################
broker_address="broker.hivemq.com"
#broker_address="iot.eclipse.org"
print("creating new instance")
client = mqtt.Client("P1asdasdasd3224") #create new instance
client.on_message=on_message #attach function to callback
print("connecting to broker")
client.connect(broker_address) #connect to broker
client.loop_start() #start the loop

client.subscribe("bkc-device/printer")
#client.subscribe("backupcomputer/drawer/lock")
#print("Publishing message to topic","backupcomputer/fileslist")
#client.publish("backupcomputer/fileslist","OFF")
#time.sleep(4) # wait
#client.loop_stop() #stop the loop

while 1:
    print("running")
    

    

    filesList=fileSearch.getFilesList()
    for i in range(0,len(filesList)):

        filesString=filesString+filesList[i]+","
    filesString=filesString[:-1]#removes last comma
    #jProto.append(addFile("testPrint.jpeg","Picture"))
    client.publish("bkc-device/filesList",filesString)

    
    
    time.sleep(1)