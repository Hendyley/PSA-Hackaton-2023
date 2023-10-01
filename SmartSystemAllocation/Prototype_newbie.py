import requests
import os
import json

resp = requests.post("https://triggerproc-cytkfcb3vq-as.a.run.app")


file_path = './src/Result/output.json'
with open(file_path, 'w') as file:
    json.dump(resp.json(), file)


